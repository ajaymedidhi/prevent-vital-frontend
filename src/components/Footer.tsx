
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

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
    { label: 'HIPAA Compliance',    href: '/' },
    { label: 'Cookie Policy',       href: '/' },
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

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(213_55%_14%)] text-white">

      {/* ── Main Footer ── */}
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
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
          </div>

          {/* Link columns */}
          {[
            { heading: 'Platform',   links: footerLinks.platform  },
            { heading: 'Company',    links: footerLinks.company   },
            { heading: 'Resources',  links: footerLinks.resources },
            { heading: 'Legal',      links: footerLinks.legal     },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
