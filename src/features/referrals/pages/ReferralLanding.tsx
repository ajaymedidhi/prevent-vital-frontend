import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Gift, Smartphone } from 'lucide-react';

// Public landing page for shared referral links (/refer/:code). The app has no deferred deep
// linking, so the code is shown to enter after sign-up; "Open in the app" works when it's
// already installed (preventvital://refer/CODE prefills it).
const APP_STORE_URL = 'https://apps.apple.com/in/app/prevent-vital/id6781125644';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.preventvital.app';
const CODE = /^[A-Z2-9]{8}$/;

const ReferralLanding = () => {
    const { code: raw = '' } = useParams();
    const code = raw.toUpperCase();
    const valid = CODE.test(code);

    return (
        <div className="min-h-[70vh] bg-slate-50 px-4 py-12 flex justify-center">
            <Helmet>
                <title>You're invited to PreventVital</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center shadow-sm">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Gift size={28} aria-hidden />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mt-4">A friend invited you to PreventVital</h1>
                <p className="text-slate-600 mt-2">
                    Get your VITAL Score, a clear read on your heart and metabolic health, and a plan to improve it.
                </p>

                {valid ? (
                    <>
                        <p className="text-sm font-semibold text-slate-700 mt-6">Your friend's referral code</p>
                        <div className="mt-2 rounded-xl border-2 border-dashed border-indigo-300 py-3 text-3xl font-extrabold tracking-[0.3em] text-slate-900 select-all">
                            {code}
                        </div>
                        <ol className="text-left text-sm text-slate-600 mt-5 space-y-1.5 list-decimal list-inside">
                            <li>Install PreventVital and create your account.</li>
                            <li>Go to Profile, then <strong>Have a referral code?</strong>, and enter the code above.</li>
                        </ol>
                        <a
                            href={`preventvital://refer/${code}`}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12"
                        >
                            <Smartphone size={18} aria-hidden />Open in the app
                        </a>
                    </>
                ) : (
                    <p className="text-sm text-red-700 mt-6">This invite link doesn't look right. Ask your friend to share it again.</p>
                )}

                <div className="grid grid-cols-2 gap-3 mt-4">
                    <a href={APP_STORE_URL} className="rounded-xl border border-slate-300 h-11 flex items-center justify-center text-sm font-semibold text-slate-800 hover:bg-slate-50">App Store</a>
                    <a href={PLAY_STORE_URL} className="rounded-xl border border-slate-300 h-11 flex items-center justify-center text-sm font-semibold text-slate-800 hover:bg-slate-50">Google Play</a>
                </div>
            </div>
        </div>
    );
};

export default ReferralLanding;
