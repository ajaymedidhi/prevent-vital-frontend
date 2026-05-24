import { useState, useRef, useCallback } from 'react';
import * as mediaApi from '../../admin-shared/services/mediaApi';

export type MediaType = 'video' | 'image' | 'resource';
export type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export interface UploadedMedia {
    mediaId: string;
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number;
    type: MediaType;
    signedUrl?: string;
}

interface UseMediaUploadOptions {
    type: MediaType;
    programId?: string;
    onSuccess?: (media: UploadedMedia) => void;
    onError?: (message: string) => void;
}

export const useMediaUpload = ({ type, programId, onSuccess, onError }: UseMediaUploadOptions) => {
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [media, setMedia] = useState<UploadedMedia | null>(null);
    const abortCtrl = useRef<AbortController | null>(null);

    const cancel = useCallback(() => {
        abortCtrl.current?.abort();
        abortCtrl.current = null;
        setStatus('idle');
        setProgress(0);
        setError(null);
    }, []);

    const reset = useCallback(() => {
        cancel();
        setMedia(null);
    }, [cancel]);

    // ── Video: request resumable URL → PUT to GCS → confirm ──────────────────
    const uploadVideo = useCallback(
        async (file: File) => {
            setStatus('uploading');
            setProgress(0);
            setError(null);

            abortCtrl.current = new AbortController();

            try {
                const { data: initRes } = await mediaApi.requestUploadUrl({
                    programId,
                    type: 'video',
                    fileName: file.name,
                    mimeType: file.type,
                    size: file.size
                });
                const { mediaId, uploadUrl } = initRes.data;

                // Upload raw bytes directly to GCS (progress tracked via XHR)
                await mediaApi.uploadToGCS(
                    file,
                    uploadUrl,
                    setProgress,
                    abortCtrl.current.signal
                );

                setProgress(97);
                setStatus('processing');

                const { data: confirmRes } = await mediaApi.confirmUpload(mediaId);
                const m = confirmRes.data.media;

                const uploaded: UploadedMedia = {
                    mediaId: m._id,
                    fileName: m.fileName,
                    originalName: m.originalName,
                    mimeType: m.mimeType,
                    size: m.size,
                    type: 'video'
                };

                setProgress(100);
                setStatus('success');
                setMedia(uploaded);
                onSuccess?.(uploaded);
            } catch (err: any) {
                if (err.message === 'CANCELLED') return;
                const msg = err.response?.data?.message ?? err.message ?? 'Upload failed.';
                setError(msg);
                setStatus('error');
                onError?.(msg);
            }
        },
        [programId, onSuccess, onError]
    );

    // ── Image / Resource: multipart POST proxied through backend → GCS ────────
    const uploadDirect = useCallback(
        async (file: File) => {
            setStatus('uploading');
            setProgress(0);
            setError(null);

            try {
                const { data: res } = await mediaApi.directUpload(
                    file,
                    { type, programId },
                    setProgress
                );
                const m = res.data.media;

                const uploaded: UploadedMedia = {
                    mediaId: m._id,
                    fileName: m.fileName,
                    originalName: m.originalName,
                    mimeType: m.mimeType,
                    size: m.size,
                    type,
                    signedUrl: m.signedUrl
                };

                setProgress(100);
                setStatus('success');
                setMedia(uploaded);
                onSuccess?.(uploaded);
            } catch (err: any) {
                const msg = err.response?.data?.message ?? err.message ?? 'Upload failed.';
                setError(msg);
                setStatus('error');
                onError?.(msg);
            }
        },
        [type, programId, onSuccess, onError]
    );

    const upload = useCallback(
        (file: File) => (type === 'video' ? uploadVideo(file) : uploadDirect(file)),
        [type, uploadVideo, uploadDirect]
    );

    return { status, progress, error, media, upload, cancel, reset };
};
