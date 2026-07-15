import { useParams, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { programService } from '../programService';
import { Loader2, AlertTriangle, CheckCircle2, Lock, Play, Clock, BarChart, Calendar, X, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as mediaApi from '@/admin-shared/services/mediaApi';

interface Module {
    title: string;
    content?: string;
    videoUrl?: string;
    videoMediaId?: string;
    contentType?: string;
    duration?: number;
    mediaMeta?: { fileName: string; size: number; mimeType: string; duration?: number };
}

// ── Inline video player modal ────────────────────────────────────────────────
function VideoPlayer({ module: mod, onClose }: { module: Module; onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm font-medium"
                >
                    <X size={18} /> Close
                </button>
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                    {mod.videoUrl ? (
                        <video
                            ref={videoRef}
                            src={mod.videoUrl}
                            controls
                            autoPlay
                            className="w-full max-h-[70vh] bg-black"
                            controlsList="nodownload"
                        >
                            Your browser does not support video playback.
                        </video>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-white/50 gap-3">
                            <Video size={40} />
                            <p className="text-sm">Video is being processed. Please try again shortly.</p>
                        </div>
                    )}
                    <div className="p-4 bg-gray-900">
                        <h3 className="font-bold text-white text-sm">{mod.title}</h3>
                        {mod.content && <p className="text-gray-400 text-xs mt-1 line-clamp-2">{mod.content}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProgramDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [activeModule, setActiveModule] = useState<Module | null>(null);
    const [loadingModuleIdx, setLoadingModuleIdx] = useState<number | null>(null);
    const [moduleError, setModuleError] = useState<string | null>(null);

    const getStreamUrl = (mediaId: string) => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token') || '';
        const base = (import.meta.env.VITE_API_URL || '') + '/api/media';
        return `${base}/${mediaId}/stream?token=${encodeURIComponent(token)}`;
    };

    const openModule = async (mod: Module, idx: number) => {
        // If we already have the video URL, open immediately
        if (mod.videoUrl) {
            setActiveModule(mod);
            return;
        }
        if (!mod.videoMediaId) return;

        setLoadingModuleIdx(idx);
        setModuleError(null);
        let resolvedUrl: string | undefined;
        try {
            // Try signed URL first (best for performance, works on Cloud Run with IAM)
            const { data } = await mediaApi.getSignedUrl(mod.videoMediaId);
            resolvedUrl = data?.data?.signedUrl;
        } catch {
            // signed URL failed — fall through to stream proxy
        }

        // Fallback: backend stream proxy (works without GCS signing credentials)
        if (!resolvedUrl) {
            resolvedUrl = getStreamUrl(mod.videoMediaId);
        }

        setLoadingModuleIdx(null);
        setActiveModule({ ...mod, videoUrl: resolvedUrl });
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['program', id],
        queryFn: () => programService.getProgram(id!),
        enabled: !!id
    });

    const program = data?.data.program;

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    if (isError || !program) return <div className="min-h-screen flex items-center justify-center">Program not found</div>;

    return (
        <>
            {activeModule && (
                <VideoPlayer module={activeModule} onClose={() => setActiveModule(null)} />
            )}
            <Helmet>
                <title>{program.title} - PreventVital</title>
                <meta name="description" content={program.description.slice(0, 160)} />
            </Helmet>

            <div className="min-h-screen bg-background pb-20">
                {/* Hero Header */}
                <div className="relative h-[60vh] md:h-[500px] w-full overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                        <div className="container mx-auto">
                            <div className="flex gap-2 mb-4">
                                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30">
                                    {program.category}
                                </Badge>
                                <Badge variant="outline" className="bg-background/50 backdrop-blur-md text-foreground border-white/20">
                                    {program.difficulty}
                                </Badge>
                            </div>
                            <h1 className="font-bold mb-4 text-foreground/90 max-w-3xl leading-tight" style={{ fontSize: 'var(--fz-h1-sm)' }}>
                                {program.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground/90 font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock size={20} />
                                    {program.durationWeeks} Weeks
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={20} />
                                    {program.totalSessions} Sessions
                                </div>
                                <div className="flex items-center gap-2 text-amber-500">
                                    <BarChart size={20} />
                                    {program.averageRating} ({program.reviewCount} Reviews)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {program.description}
                            </p>
                        </section>

                        <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
                            <div className="flex gap-3">
                                <AlertTriangle className="text-amber-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Medical Disclaimer</h3>
                                    <p className="text-sm text-muted-foreground">
                                        This program is designed for preventive care and wellness enhancement. It is not a substitute for professional medical advice, diagnosis, or treatment.
                                        <strong> Always consult with your doctor</strong> before starting any new health program, especially if you have pre-existing conditions.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Session Curriculum</h2>
                            {moduleError && (
                                <div className="mb-3 px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl flex items-center gap-2">
                                    <AlertTriangle size={14} />
                                    {moduleError}
                                </div>
                            )}
                            <div className="space-y-3">
                                {program.modules?.length === 0 ? (
                                    <div className="p-8 text-center border border-dashed rounded-xl text-muted-foreground">
                                        Curriculum details coming soon.
                                    </div>
                                ) : (
                                    program.modules?.map((mod: Module, idx: number) => {
                                        const hasVideo = !!mod.videoUrl || !!mod.videoMediaId;
                                        const isLoading = loadingModuleIdx === idx;
                                        const isArticle = mod.contentType === 'article';
                                        const typeLabel = isArticle ? 'Article' : `${mod.duration ?? 0} mins · Video`;
                                        const TypeIcon = isArticle ? FileText : Video;

                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => !isLoading && hasVideo && openModule(mod, idx)}
                                                className={`flex items-center justify-between p-4 bg-card border rounded-xl transition-all group
                                                    ${hasVideo && !isLoading ? 'hover:border-primary/60 hover:shadow-md hover:shadow-primary/5 cursor-pointer' : ''}
                                                    ${!hasVideo ? 'opacity-70' : ''}
                                                    ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0
                                                        ${hasVideo ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                        {isLoading
                                                            ? <Loader2 size={16} className="animate-spin" />
                                                            : hasVideo
                                                                ? <Play size={16} className="fill-current ml-0.5" />
                                                                : idx + 1
                                                        }
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-medium transition-colors ${hasVideo ? 'group-hover:text-primary' : ''}`}>
                                                            {mod.title || `Module ${idx + 1}`}
                                                        </h4>
                                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                            <TypeIcon size={11} />
                                                            {typeLabel}
                                                        </p>
                                                    </div>
                                                </div>
                                                {isLoading ? (
                                                    <span className="text-xs font-semibold text-primary/60 bg-primary/5 px-3 py-1 rounded-full mr-1">
                                                        Loading…
                                                    </span>
                                                ) : hasVideo ? (
                                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mr-1
                                                                     group-hover:bg-primary group-hover:text-white transition-colors">
                                                        Watch
                                                    </span>
                                                ) : (
                                                    <Lock size={15} className="text-muted-foreground/40 mr-3" />
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar CTA */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
                            <div className="mb-6">
                                <span className="text-muted-foreground text-sm uppercase tracking-wide font-semibold">Access Type</span>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-3xl font-bold text-primary capitalize">{program.pricingType}</span>
                                    {program.pricingType === 'subscription' && <span className="text-muted-foreground">with Plan</span>}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span>Full access to all {program.totalSessions} sessions</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span>Personalized progress tracking</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span>Mobile app access</span>
                                </div>
                            </div>

                            <Button size="lg" className="w-full mb-3" asChild>
                                <Link to="/login?redirect=app-download">
                                    Enroll in Mobile App
                                </Link>
                            </Button>

                            <p className="text-xs text-center text-muted-foreground">
                                Use the PreventVital App to enroll, track vitals, and execute daily sessions.
                            </p>
                        </div>

                        {/* Creator Bio */}
                        <div className="bg-muted/30 rounded-xl p-6 flex items-start gap-4">
                            <img
                                src={program.creator.photo || "https://github.com/shadcn.png"}
                                alt={program.creator.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-background"
                            />
                            <div>
                                <h4 className="font-semibold text-foreground">{program.creator.name}</h4>
                                <p className="text-xs text-muted-foreground mb-2">{program.creator.qualification || 'Certified Expert'}</p>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {program.creator.bio || 'Expert in preventive healthcare and wellness with over 10 years of experience.'}
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
