import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

type VerifyState = 'loading' | 'success' | 'error';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [state, setState] = useState<VerifyState>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setState('error');
      setMessage('This verification link is missing or malformed.');
      return;
    }

    let cancelled = false;
    axios.get('/api/auth/verify-email', { params: { token } })
      .then(() => {
        if (cancelled) return;
        setState('success');
      })
      .catch((error: any) => {
        if (cancelled) return;
        setState('error');
        setMessage(error.response?.data?.message ?? 'The link may be invalid or expired.');
      });

    return () => { cancelled = true; };
  }, [token]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex w-[48%] xl:w-[46%] relative bg-gradient-to-br from-[hsl(var(--primary))] via-[#1e5a8e] to-[#0f766e] items-center justify-center overflow-hidden p-12">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(13,148,136,0.25) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <img src="/images/logo-new.png" alt="PreventVital" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">PreventVital</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-2 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-white/90">
              <ShieldCheck size={16} className="text-emerald-300" />
              <p className="text-sm font-medium">HIPAA Compliant & ISO 27001 Certified</p>
            </div>
            <p className="text-xs text-white/50">
              Your health data is encrypted and secure
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 md:px-12 bg-background relative">

        <div className="absolute top-6 left-6 md:top-8 md:left-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-muted group-hover:bg-secondary flex items-center justify-center transition-colors">
              <ArrowLeft size={14} />
            </span>
            Back
          </Link>
        </div>

        <motion.div
          className="w-full max-w-sm space-y-7 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {state === 'loading' && (
            <div className="space-y-4">
              <div className="flex justify-center mb-1">
                <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center border border-primary/12">
                  <Loader2 size={24} className="text-primary animate-spin" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Verifying your email…</h1>
              <p className="text-sm text-muted-foreground">This will only take a moment.</p>
            </div>
          )}

          {state === 'success' && (
            <div className="space-y-4">
              <div className="flex justify-center mb-1">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 size={24} className="text-emerald-600" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Email verified</h1>
              <p className="text-sm text-muted-foreground">
                Your email address has been confirmed successfully.
              </p>
              <Link to="/login">
                <Button className="w-full h-11 text-sm font-semibold rounded-xl" style={{ background: 'hsl(var(--primary))' }}>
                  Continue to sign in
                </Button>
              </Link>
            </div>
          )}

          {state === 'error' && (
            <div className="space-y-4">
              <div className="flex justify-center mb-1">
                <div className="w-14 h-14 bg-destructive/10 rounded-2xl flex items-center justify-center border border-destructive/20">
                  <AlertTriangle size={24} className="text-destructive" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Verification failed</h1>
              <p className="text-sm text-muted-foreground">{message}</p>
              <Link to="/login">
                <Button variant="outline" className="w-full h-11 text-sm font-semibold rounded-xl">
                  Back to sign in
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        <p className="absolute bottom-6 text-xs text-muted-foreground/60 text-center px-4">
          © {new Date().getFullYear()} PreventVital. Protected by HIPAA & ISO 27001.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
