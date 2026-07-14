import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setCredentials } from '../store';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  ArrowLeft, Eye, EyeOff, Shield, Activity, Heart,
  ShieldCheck, Zap, Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { preWarmBackend } from '../utils/performance';
import { useToast } from '../hooks/use-toast';

/* Animated vitals strip on the left panel */
const VitalsStrip = () => {
  const vitals = [
    { label: 'Heart Rate',  value: '72 BPM',  color: '#ef4444', icon: Heart,    bg: '#fef2f2' },
    { label: 'SpO₂',        value: '98%',     color: '#3b82f6', icon: Activity, bg: '#eff6ff' },
    { label: 'Risk Score',  value: 'Low',     color: '#0d9488', icon: Shield,   bg: '#f0fdfa' },
    { label: 'Streak',      value: '7 Days',  color: '#f59e0b', icon: Zap,      bg: '#fffbeb' },
  ];

  return (
    <div className="w-full max-w-xs space-y-3">
      {vitals.map((v, i) => (
        <motion.div
          key={v.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3.5 bg-white rounded-2xl px-4 py-3.5 border border-slate-100 shadow-sm"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: v.bg, color: v.color }}
          >
            <v.icon size={18} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-slate-400 leading-none mb-0.5">{v.label}</p>
            <p className="text-sm font-bold text-slate-800 leading-none">{v.value}</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </motion.div>
      ))}
    </div>
  );
};

const Login = () => {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);

  const { toast } = useToast();
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  React.useEffect(() => { preWarmBackend(); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/login', {
        email:    email.trim(),
        password: password.trim(),
      });

      const { token }  = response.data;
      const { user }   = response.data.data;

      if (!token || !user) throw new Error('Invalid response from server');

      dispatch(setCredentials({ user, token }));

      const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
      if (redirectUrl) { navigate(`/${redirectUrl}`); return; }

      const roleRoutes: Record<string, string> = {
        super_admin:    '/super-admin/dashboard',
        content_creator: '/creator/dashboard',
        admin:          '/admin/dashboard',
        customer:       '/account',
      };

      if (user.role === 'corporate_admin') {
        const id = user.corporateId || user.tenantId;
        navigate(id ? `/corporate/${id}/dashboard` : '/');
      } else {
        navigate(roleRoutes[user.role] ?? '/');
      }
    } catch (error: any) {
      toast({
        title:       'Login failed',
        description: error.response?.data?.message ?? 'Please check your credentials and try again.',
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

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(13,148,136,0.25) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center text-center gap-8">

          {/* Brand mark */}
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

          {/* Vitals cards */}
          <VitalsStrip />

          {/* Trust statement */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
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

        {/* Back link */}
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
          className="w-full max-w-sm space-y-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center border border-primary/12">
                <Lock size={24} className="text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access your health dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 rounded-xl border-border bg-background pr-10 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">
                New to PreventVital?
              </span>
            </div>
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors"
            >
              Create account
            </Link>
          </p>
        </motion.div>

        {/* Footer */}
        <p className="absolute bottom-6 text-xs text-muted-foreground/60 text-center px-4">
          © {new Date().getFullYear()} PreventVital. Protected by HIPAA & ISO 27001.
        </p>
      </div>
    </div>
  );
};

export default Login;
