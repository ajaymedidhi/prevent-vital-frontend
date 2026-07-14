import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, ShieldCheck, KeyRound, MailCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent]           = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { email: email.trim() });
      setSent(true);
    } catch (error: any) {
      toast({
        title:       'Something went wrong',
        description: error.response?.data?.message ?? 'Please try again in a moment.',
        variant:     'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 md:px-12 bg-background relative">

        <div className="absolute top-6 left-6 md:top-8 md:left-10">
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-muted group-hover:bg-secondary flex items-center justify-center transition-colors">
              <ArrowLeft size={14} />
            </span>
            Back to sign in
          </Link>
        </div>

        <motion.div
          className="w-full max-w-sm space-y-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {!sent ? (
            <>
              <div className="text-center space-y-1.5">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center border border-primary/12">
                    <KeyRound size={24} className="text-primary" />
                  </div>
                </div>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">Forgot your password?</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email and we'll send you a link to reset it
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="h-11 rounded-xl border-border bg-background focus:border-primary focus-visible:ring-1 focus-visible:ring-primary/20"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 text-sm font-semibold rounded-xl transition-all duration-300"
                  style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending link…
                    </span>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-1">
                <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center border border-primary/12">
                  <MailCheck size={24} className="text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Check your email</h1>
              <p className="text-sm text-muted-foreground">
                If an account exists for <span className="font-medium text-foreground">{email}</span>, we've sent a link to reset your password. It expires in 1 hour.
              </p>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Remembered your password?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        <p className="absolute bottom-6 text-xs text-muted-foreground/60 text-center px-4">
          © {new Date().getFullYear()} PreventVital. Protected by HIPAA & ISO 27001.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
