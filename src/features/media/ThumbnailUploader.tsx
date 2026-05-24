import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, UploadCloud, CheckCircle2, AlertCircle, X, RefreshCw, Loader2 } from 'lucide-react';
import { useMediaUpload } from './useMediaUpload';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

interface Props {
    programId?: string;
    onUploadComplete: (mediaId: string, signedUrl?: string) => void;
    onRemove?: () => void;
    label?: string;
    compact?: boolean;
}

const ThumbnailUploader: React.FC<Props> = ({
    programId,
    onUploadComplete,
    onRemove,
    label = 'Upload Thumbnail',
    compact = false
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { status, progress, error: uploadError, upload, cancel, reset } = useMediaUpload({
        type: 'image',
        programId,
        onSuccess: (m) => onUploadComplete(m.mediaId, m.signedUrl)
    });

    const handleFile = useCallback(
        (f: File) => {
            setLocalError(null);
            if (!ALLOWED_TYPES.includes(f.type)) {
                setLocalError('Unsupported format. Please use JPG, PNG, WebP, or GIF.');
                return;
            }
            if (f.size > MAX_SIZE_BYTES) {
                setLocalError('Image exceeds the 20 MB limit.');
                return;
            }
            // Local preview before upload
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target?.result as string);
            reader.readAsDataURL(f);
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
        setPreview(null);
        setLocalError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        onRemove?.();
    };

    const displayError = localError || uploadError;
    const isLoading = status === 'uploading' || status === 'processing';

    // ── Success with preview ──────────────────────────────────────────────────
    if (status === 'success' && preview) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
            >
                <div className={`relative overflow-hidden rounded-2xl border-2 border-emerald-200 bg-black
                    ${compact ? 'h-28' : 'h-44'}`}>
                    <img
                        src={preview}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <button
                            onClick={handleClear}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white
                                       text-red-500 rounded-full p-2 shadow-lg"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1">
                        <CheckCircle2 size={14} />
                    </div>
                </div>
            </motion.div>
        );
    }

    // ── Uploading with preview overlay ────────────────────────────────────────
    if (isLoading && preview) {
        return (
            <div className={`relative overflow-hidden rounded-2xl border-2 border-blue-100 bg-black
                ${compact ? 'h-28' : 'h-44'}`}>
                <img src={preview} alt="" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/20">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                    <div className="w-3/4 h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-white text-xs font-bold">{progress}%</span>
                </div>
            </div>
        );
    }

    // ── Drop zone ─────────────────────────────────────────────────────────────
    return (
        <div className="space-y-2">
            <motion.label
                htmlFor={`thumb-upload-${label}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                animate={{
                    borderColor: isDragging ? '#8b5cf6' : displayError ? '#f87171' : '#e5e7eb',
                    backgroundColor: isDragging ? 'rgba(245,243,255,0.8)' : 'rgba(249,250,251,0.4)'
                }}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed
                            rounded-2xl cursor-pointer transition-colors group
                            ${compact ? 'py-6' : 'py-8'}`}
            >
                <input
                    id={`thumb-upload-${label}`}
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                    }}
                />
                <motion.div
                    animate={{ scale: isDragging ? 1.1 : 1 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                        ${isDragging
                            ? 'bg-purple-100 text-purple-500'
                            : 'bg-gray-100 text-gray-300 group-hover:bg-purple-50 group-hover:text-purple-400'
                        }`}
                >
                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Image size={24} />}
                </motion.div>
                <div className="text-center">
                    <p className="font-bold text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                        {isDragging ? 'Drop image here' : label}
                    </p>
                    {!compact && (
                        <p className="text-xs text-gray-400 mt-0.5">
                            JPG, PNG, WebP · Max 20 MB
                        </p>
                    )}
                </div>
            </motion.label>

            <AnimatePresence>
                {displayError && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100
                                   text-red-600 text-xs rounded-xl"
                    >
                        <AlertCircle size={13} className="shrink-0" />
                        <span className="flex-1">{displayError}</span>
                        <button onClick={handleClear} className="hover:text-red-800">
                            <RefreshCw size={11} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThumbnailUploader;
