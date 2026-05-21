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
  ShieldCheck, CheckCircle, UserPlus,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../hooks/use-toast';

/* ── Feature benefit pills ── */
const benefits = [
  { icon: Shield,        text: 'AI-powered health risk assessment' },
  { icon: Activity,     text: '24/7 continuous health monitoring' },
  { icon: Heart,        text: 'Personalised prevention programs' },
  { icon: ShieldCheck,  text: 'HIPAA compliant & fully encrypted' },
];

const Signup = () => {
  const [name, setName]                         = useState('');
  const [email, setEmail]                       = useState('');
  const [password, setPassword]                 = useState('');
  const [confirmPassword, setConfirmPassword]   = useState('');
  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirm, setShowConfirm]           = useState(false);
  const [isLoading, setIsLoading]               = useState(false);

  const { toast } = useToast();
  const dispatch   = useDispatch();
  const navigate   = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title:       'Passwords do not match',
        description: 'Please ensure both password fields are identical.',
        variant:     'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      const { token } = response.data;
      const { user }  = response.data.data;

      if (!token || !user) throw new Error('Invalid response from server');

      dispatch(setCredentials({ user, token }));
      navigate('/account');
    } catch (error: any) {
      toast({
        title:       'Sign up failed',
        description: error.response?.data?.message ?? 'Something went wrong. Please try again.',
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(13,148,136,0.2) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-sm">

          {/* Brand */}
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

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Join 10,000+ people taking control of their health
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              India's first AI-powered preventive medicine platform
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="w-full space-y-2.5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/15">
                  <b.icon size={15} className="text-white/80" strokeWidth={2} />
                </div>
                <span className="text-sm text-white/80 font-medium">{b.text}</span>
                <CheckCircle size={14} className="text-emerald-400 ml-auto flex-shrink-0" />
              </motion.div>
            ))}
          </div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center gap-2 text-white/60 text-xs"
          >
            <ShieldCheck size={13} className="text-emerald-300" />
            HIPAA Compliant · ISO 27001 · End-to-end encrypted
          </motion.div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 md:px-12 bg-background relative overflow-y-auto">

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
          className="w-full max-w-sm space-y-6 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 bg-accent/8 rounded-2xl flex items-center justify-center border border-accent/12">
                <UserPlus size={24} className="text-accent" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Create your account</h1>
            <p className="text-sm text-muted-foreground">
              Start your preventive health journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">

            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Arjun Sharma"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
                className="h-11 rounded-xl border-border bg-background focus:border-primary focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>

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
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
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

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Confirm password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="h-11 rounded-xl border-border bg-background pr-10 focus:border-primary focus-visible:ring-1 focus-visible:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(p => !p)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              By creating an account you agree to our{' '}
              <Link to="/terms-and-conditions" className="text-primary hover:underline underline-offset-2">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-primary hover:underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-sm font-semibold rounded-xl transition-all duration-300"
              style={{ background: 'hsl(var(--accent))', boxShadow: '0 2px 12px hsl(var(--accent) / 0.25)' }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors"
            >
              Sign in
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

export default Signup;
