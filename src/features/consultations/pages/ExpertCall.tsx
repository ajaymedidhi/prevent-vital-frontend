import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { ArrowLeft } from 'lucide-react';
import { JoinInfo, errorMessage, joinCall } from '../api';

// Full-screen LiveKit call for the expert. Rendered outside ExpertLayout so the call gets the
// whole window. Leaving returns to the consultation page to write notes.
const ExpertCall = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [join, setJoin] = useState<JoinInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        joinCall(id!).then(setJoin).catch(e => setError(errorMessage(e, 'Could not join the call.')));
    }, [id]);

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-900 text-white p-6 text-center">
                <p className="text-lg">{error}</p>
                <Link to={`/expert/consultations/${id}`} className="inline-flex items-center gap-2 text-indigo-300 hover:text-white">
                    <ArrowLeft size={16} /> Back to consultation
                </Link>
            </div>
        );
    }
    if (!join) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300">Connecting…</div>;
    }

    return (
        <div data-lk-theme="default" style={{ height: '100dvh' }}>
            <LiveKitRoom
                serverUrl={join.url}
                token={join.token}
                connect
                video
                audio
                onDisconnected={() => navigate(`/expert/consultations/${id}`)}
                style={{ height: '100%' }}
            >
                <VideoConference />
            </LiveKitRoom>
        </div>
    );
};

export default ExpertCall;
