
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, MapPin, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'AI Health Assessment',    href: '/ai-health-assessment' },
    { label: 'Prevention Programs',     href: '/disease-prevention-programs' },
    { label: 'Therapeutic Programs',    href: '/therapeutic-programs-center' },
    { label: 'Medical Portal',          href: '/medical-professional-portal' },
  ],
  company: [
    { label: 'About Us',            href: '/about-us' },
    { label: 'Our Team',            href: '/team' },
    { label: 'Partnership Portal',  href: '/partnership-portal' },
    { label: 'Contact Us',          href: '/contact' },
  ],
  resources: [
    { label: 'Health Library',   href: '/' },
    { label: 'Success Stories',  href: '/' },
    { label: 'Blog',             href: '/' },
    { label: 'FAQs',             href: '/' },
  ],
  legal: [
    { label: 'Privacy Policy',      href: '/privacy-policy' },
    { label: 'Terms of Service',    href: '/terms-and-conditions' },
    { label: 'HIPAA Compliance',    href: '/hipaa-compliance' },
    { label: 'Cookie Policy',       href: '/cookie-policy' },
  ],
};

const socialLinks = [
  { name: 'LinkedIn',   icon: Linkedin,  href: '#' },
  { name: 'Twitter',    icon: Twitter,   href: '#' },
  { name: 'Instagram',  icon: Instagram, href: '#' },
  { name: 'Facebook',   icon: Facebook,  href: '#' },
];

const certBadges = [
  { icon: ShieldCheck, label: 'ISO 27001 Certified' },
  { icon: Lock,        label: 'HIPAA Compliant' },
];

const APP_STORE_URL   = 'https://apps.apple.com/in/app/prevent-vital/id6781125644';
const PLAY_STORE_URL  = 'https://play.google.com/store/apps/details?id=com.preventvital.app';

const AppleLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.415-3.13c.837-1.012 1.4-2.42 1.245-3.766-1.207.052-2.662.805-3.532 1.817-.78.887-1.454 2.32-1.273 3.622 1.297.104 2.622-.66 3.56-1.673z" />
  </svg>
);

const GooglePlayLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.442V3.256c0-.554.225-1.055.609-1.442zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626c.71.41 1.109.902 1.109 1.492s-.399 1.082-1.109 1.492l-2.807 1.626L15.401 12l2.297-2.29zM6.363 1.658L17.298 8l-2.302 2.302L6.363 1.658z" />
  </svg>
);

const appBadges = [
  {
    name: 'App Store',
    href: APP_STORE_URL,
    Logo: AppleLogo,
    eyebrow: 'Download on the',
    title: 'App Store',
  },
  {
    name: 'Google Play',
    href: PLAY_STORE_URL,
    Logo: GooglePlayLogo,
    eyebrow: 'GET IT ON',
    title: 'Google Play',
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(213_55%_14%)] text-white">

      {/* ── Main Footer ── */}
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:max-w-xs space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/15">
                <img src="/images/logo-new.png" alt="PreventVital" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white group-hover:text-white/90 transition-colors">
                PreventVital
              </span>
            </Link>

            <p className="text-sm text-white/55 leading-relaxed max-w-xs">
              India's first AI-powered preventive medicine platform — combining cutting-edge technology with holistic wellness wisdom.
            </p>

            {/* Address */}
            <div className="flex items-start gap-2 text-sm text-white/55">
              <MapPin size={15} className="text-white/40 flex-shrink-0 mt-0.5" />
              <span>Hyderabad, Telangana</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/16 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={15} className="text-white/70" />
                </a>
              ))}
            </div>

            {/* App store badges */}
            <div className="space-y-2.5 pt-1">
              <p className="text-xs font-semibold text-white/40">Available on</p>
              <div className="flex items-center gap-3">
                {appBadges.map(({ name, href, Logo, eyebrow, title }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/8 hover:bg-white/16 border border-white/15 hover:border-white/25 transition-all duration-200"
                  >
                    <Logo />
                    <span className="text-left leading-none">
                      <span className="block text-[9px] text-white/55 mb-0.5">{eyebrow}</span>
                      <span className="block text-sm font-semibold text-white">{title}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 lg:gap-20">
            {[
              { heading: 'Platform',   links: footerLinks.platform  },
              { heading: 'Company',    links: footerLinks.company   },
              { heading: 'Resources',  links: footerLinks.resources },
              { heading: 'Legal',      links: footerLinks.legal     },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">
                  {heading}
                </h4>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="text-base text-white/60 hover:text-white transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35 order-2 sm:order-1">
            © {currentYear} PreventVital, a unit of GruentzigAI Private Limited. All rights reserved.
          </p>

          <div className="flex items-center gap-4 order-1 sm:order-2">
            {certBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={13} className="text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-white/45 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
