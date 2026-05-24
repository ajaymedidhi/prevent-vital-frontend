import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, UploadCloud, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { useMediaUpload } from './useMediaUpload';

const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain'
];
const MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB

const EXT_LABELS: Record<string, string> = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-powerpoint': 'PPT',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
    'text/plain': 'TXT'
};

const fmtSize = (b: number) => {
    if (b === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(b) / Math.log(1024));
    return `${(b / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

interface Props {
    programId?: string;
    onUploadComplete: (mediaId: string) => void;
    onRemove?: () => void;
    label?: string;
}

const ResourceUploader: React.FC<Props> = ({
    programId,
    onUploadComplete,
    onRemove,
    label = 'Upload Resource'
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { status, progress, error: uploadError, upload, cancel, reset } = useMediaUpload({
        type: 'resource',
        programId,
        onSuccess: (m) => onUploadComplete(m.mediaId)
    });

    const handleFile = useCallback(
        (f: File) => {
            setLocalError(null);
            if (!ALLOWED_TYPES.includes(f.type)) {
                setLocalError('Unsupported format. Please upload PDF, DOCX, PPTX, or TXT.');
                return;
            }
            if (f.size > MAX_SIZE_BYTES) {
                setLocalError('File exceeds 100 MB limit.');
                return;
            }
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
    const isLoading = status === 'uploading' || status === 'processing';

    // ── Success ───────────────────────────────────────────────────────────────
    if (status === 'success' && file) {
        return (
            <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 bg-amber-50 border-2 border-amber-200 rounded-xl"
            >
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-amber-900 text-sm truncate">{file.name}</p>
                    <p className="text-xs text-amber-600">
                        {EXT_LABELS[file.type] ?? 'File'} · {fmtSize(file.size)}
                    </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <button onClick={handleClear} className="p-1 text-gray-300 hover:text-red-400 transition-colors">
                    <X size={14} />
                </button>
            </motion.div>
        );
    }

    // ── Loading ───────────────────────────────────────────────────────────────
    if (isLoading && file) {
        return (
            <div className="flex items-center gap-3 p-3 bg-gray-50 border-2 border-gray-100 rounded-xl">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="font-bold text-gray-700 text-sm truncate">{file.name}</p>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">
                        {progress}% — uploading…
                    </p>
                </div>
                <button onClick={handleClear} className="p-1 text-gray-300 hover:text-red-400">
                    <X size={14} />
                </button>
            </div>
        );
    }

    // ── Drop zone ─────────────────────────────────────────────────────────────
    return (
        <div className="space-y-2">
            <motion.label
                htmlFor={`resource-upload-${label}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                animate={{
                    borderColor: isDragging ? '#f59e0b' : displayError ? '#f87171' : '#e5e7eb'
                }}
                className="flex items-center gap-3 px-5 py-4 border-2 border-dashed rounded-xl
                           cursor-pointer transition-colors hover:border-amber-300 hover:bg-amber-50/30 group"
            >
                <input
                    id={`resource-upload-${label}`}
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    className="hidden"
                    onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                    }}
                />
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                    ${isDragging ? 'bg-amber-100 text-amber-500' : 'bg-gray-100 text-gray-300 group-hover:bg-amber-50 group-hover:text-amber-400'}`}>
                    <UploadCloud size={20} />
                </div>
                <div>
                    <p className="font-bold text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                        {isDragging ? 'Drop file here' : label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">PDF, DOCX, PPTX, TXT · Max 100 MB</p>
                </div>
            </motion.label>

            <AnimatePresence>
                {displayError && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100
                                   text-red-600 text-xs rounded-xl"
                    >
                        <AlertCircle size={13} className="shrink-0" />
                        <span className="flex-1">{displayError}</span>
                        <button onClick={handleClear}><RefreshCw size={11} /></button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResourceUploader;
