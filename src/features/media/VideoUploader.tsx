import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UploadCloud, Video, CheckCircle2, AlertCircle, X, RefreshCw, Play, Loader2
} from 'lucide-react';
import { useMediaUpload } from './useMediaUpload';

const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'];
const MAX_SIZE_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB

const fmtSize = (b: number) => {
    if (b === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(b) / Math.log(1024));
    return `${(b / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

interface Props {
    programId?: string;
    moduleIndex?: number;
    onUploadComplete: (mediaId: string) => void;
    onRemove?: () => void;
    initialMediaId?: string;
    label?: string;
}

const VideoUploader: React.FC<Props> = ({
    programId,
    onUploadComplete,
    onRemove,
    label = 'Upload Video'
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { status, progress, error: uploadError, upload, cancel, reset } = useMediaUpload({
        type: 'video',
        programId,
        onSuccess: (m) => onUploadComplete(m.mediaId)
    });

    const validate = (f: File) => {
        if (!ALLOWED_TYPES.includes(f.type)) {
            setLocalError('Unsupported format. Please upload MP4, WebM, MOV, or AVI.');
            return false;
        }
        if (f.size > MAX_SIZE_BYTES) {
            setLocalError('File exceeds 2 GB limit.');
            return false;
        }
        return true;
    };

    const handleFile = useCallback(
        (f: File) => {
            setLocalError(null);
            if (!validate(f)) return;
            setFile(f);
            upload(f);
        },
        [upload]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
        },
        [handleFile]
    );

    const handleClear = () => {
        cancel();
        reset();
        setFile(null);
        setLocalError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onRemove?.();
    };

    const displayError = localError || uploadError;

    // ── Success state ─────────────────────────────────────────────────────────
    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl"
            >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-emerald-900 text-sm truncate">{file?.name}</p>
                    <p className="text-xs text-emerald-600 mt-0.5">
                        {file ? fmtSize(file.size) : ''} · Stored securely in GCS
                    </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                    <button
                        onClick={handleClear}
                        title="Remove"
                        className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            </motion.div>
        );
    }

    // ── Uploading / processing state ──────────────────────────────────────────
    if (status === 'uploading' || status === 'processing') {
        const isProcessing = status === 'processing';
        return (
            <div className="p-4 bg-blue-50/60 border-2 border-blue-100 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                        {isProcessing
                            ? <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                            : <Video className="w-5 h-5 text-blue-600" />
                        }
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{file?.name}</p>
                        <p className="text-xs text-gray-400">{file ? fmtSize(file.size) : ''}</p>
                    </div>
                    {!isProcessing && (
                        <button
                            onClick={handleClear}
                            className="p-1.5 text-gray-300 hover:text-red-400 transition-colors"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-gray-500">
                        <span>{isProcessing ? 'Verifying with server…' : 'Uploading directly to cloud…'}</span>
                        <span className="text-blue-600">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // ── Idle / error drop zone ────────────────────────────────────────────────
    return (
        <div className="space-y-2">
            <motion.label
                htmlFor={`video-upload-${label}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                animate={{
                    borderColor: isDragging ? '#3b82f6' : displayError ? '#f87171' : '#e5e7eb',
                    backgroundColor: isDragging ? 'rgba(239,246,255,0.8)' : 'rgba(249,250,251,0.4)'
                }}
                className="flex flex-col items-center justify-center gap-3 py-10 border-2 border-dashed
                           rounded-2xl cursor-pointer transition-colors group"
            >
                <input
                    id={`video-upload-${label}`}
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo"
                    className="hidden"
                    onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                    }}
                />
                <motion.div
                    animate={{ scale: isDragging ? 1.1 : 1 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors
                        ${isDragging
                            ? 'bg-blue-100 text-blue-500'
                            : 'bg-gray-100 text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-400'
                        }`}
                >
                    <UploadCloud size={28} />
                </motion.div>
                <div className="text-center">
                    <p className="font-bold text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                        {isDragging ? 'Drop video here' : label}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Drag & drop or click · MP4, WebM, MOV, AVI · Max&nbsp;2&nbsp;GB
                    </p>
                    <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-widest font-bold">
                        Uploads directly to GCS — no server bottleneck
                    </p>
                </div>
            </motion.label>

            <AnimatePresence>
                {displayError && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100
                                   text-red-600 text-xs rounded-xl"
                    >
                        <AlertCircle size={14} className="shrink-0" />
                        <span className="flex-1">{displayError}</span>
                        <button onClick={handleClear} className="hover:text-red-800 transition-colors">
                            <RefreshCw size={12} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideoUploader;
