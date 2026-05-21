import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, logout } from '@/store';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<'consumer' | 'business'>('consumer');

  const cartItems = useSelector((state: RootState) => state.shop.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (['/medical-professional-portal', '/partnership-portal', '/team'].some(p => path.includes(p))) {
      setView('business');
    } else if (['/homepage', '/disease-prevention-programs', '/ai-health-assessment', '/shop'].some(p => path.includes(p))) {
      setView('consumer');
    }
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'text-primary bg-primary/8 font-semibold'
        : 'text-foreground/70 hover:text-foreground hover:bg-muted'
    }`;

  const consumerLinks = [
    { to: '/homepage',                   label: 'Home' },
    { to: '/disease-prevention-programs', label: 'Programs' },
    { to: '/ai-health-assessment',        label: 'AI Assessment' },
    { to: '/shop',                        label: 'Shop' },
  ];

  const businessLinks = [
    { to: '/medical-professional-portal', label: 'Mentorship' },
    { to: '/partnership-portal',          label: 'Partnership' },
    { to: '/team',                        label: 'Team' },
    { to: '/contact',                     label: 'Contact' },
  ];

  const activeLinks = view === 'consumer' ? consumerLinks : businessLinks;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex flex-col ${className}`}>

      {/* ── Announcement Banner ── */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-xs font-medium relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)' }} />
        <span className="relative">Transform your health with AI-powered prevention.{' '}</span>
        <Link
          to={isAuthenticated ? '/account/assessment' : '/login?redirect=account/assessment'}
          className="relative underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold"
        >
          Start Free Assessment →
        </Link>
      </div>

      {/* ── Main Header ── */}
      <header
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-white/90 backdrop-blur-md border-b border-border/50'
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* Logo */}
            <Link to="/homepage" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
              <div className="h-12 md:h-[60px] w-auto">
                <AppImage
                  src="/images/logo-new.png"
                  alt="PreventVital"
                  width={275}
                  height={60}
                  className="h-full w-auto object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Nav — centered */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {activeLinks.map(({ to, label }) => (
                <Link key={to} to={to} className={navLinkClass(to)}>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">

              {/* Consumer / Business Toggle */}
              <div
                className="flex items-center bg-muted p-0.5 rounded-lg border border-border/60"
                role="tablist"
                aria-label="Toggle view"
              >
                <button
                  role="tab"
                  aria-selected={view === 'consumer'}
                  onClick={() => { setView('consumer'); navigate('/homepage'); }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    view === 'consumer'
                      ? 'bg-white text-primary shadow-sm border border-border/40'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Consumer
                </button>
                <button
                  role="tab"
                  aria-selected={view === 'business'}
                  onClick={() => { setView('business'); navigate('/partnership-portal'); }}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    view === 'business'
                      ? 'bg-white text-primary shadow-sm border border-border/40'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Business
                </button>
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
                aria-label={`Cart (${cartCount} items)`}
              >
                <Icon name="ShoppingCartIcon" size={19} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-destructive rounded-full leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/account"
                    className="px-4 py-2 text-sm font-semibold text-primary bg-primary/8 hover:bg-primary/12 rounded-lg transition-colors border border-primary/15"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-semibold text-primary-foreground rounded-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                    style={{ background: 'hsl(var(--primary))', boxShadow: 'var(--shadow-sm)' }}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile: Cart + Menu toggle */}
            <div className="flex items-center gap-1 lg:hidden">
              <Link
                to="/cart"
                className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg transition-all"
                aria-label="Cart"
              >
                <Icon name="ShoppingCartIcon" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-destructive rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="p-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-all"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-slide-up overflow-y-auto max-h-[calc(100dvh-130px)]">
            <div className="container-wide py-5 space-y-5">

              {/* View Toggle */}
              <div className="flex items-center bg-muted p-1 rounded-xl">
                <button
                  onClick={() => { setView('consumer'); navigate('/homepage'); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    view === 'consumer'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Consumer
                </button>
                <button
                  onClick={() => { setView('business'); navigate('/partnership-portal'); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    view === 'business'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Business
                </button>
              </div>

              {/* Nav Links */}
              <nav className="space-y-1" aria-label="Mobile navigation">
                {activeLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(to)
                        ? 'text-primary bg-primary/8 font-semibold'
                        : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {label}
                    {isActive(to) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Auth */}
              <div className="pt-2 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/account" className="btn-primary btn-lg w-full justify-center">
                      My Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      className="flex items-center justify-center py-3 px-4 text-sm font-semibold text-foreground bg-muted hover:bg-muted/80 rounded-xl transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center py-3 px-4 text-sm font-semibold text-primary-foreground rounded-xl transition-all hover:opacity-90"
                      style={{ background: 'hsl(var(--primary))' }}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export { Header };
