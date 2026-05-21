import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        /* Fluid hero height: comfortable on all screens without overflow */
        minHeight: "clamp(32rem, 80svh, 56rem)",
        display: "grid",
        placeItems: "center",
        /* Fluid top padding to clear the sticky header on any screen size */
        paddingTop: "clamp(5rem, 8vw, 7rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
      }}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />

      {/* Fluid radial glow — viewport-relative so it never overflows or looks tiny */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 bg-primary/10 blur-3xl rounded-full pointer-events-none"
        style={{
          width: "clamp(20rem, 60vw, 56rem)",
          height: "clamp(20rem, 60vw, 56rem)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Grouped animation for calm entrance */}
          <div className="animate-fade-up" style={{ display: "grid", gap: "clamp(1.25rem, 3vw, 1.75rem)" }}>
            {/* Headline — fluid via CSS var, no breakpoint jumps */}
            <h1
              className="font-semibold text-balance bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent"
              style={{ fontSize: "var(--fz-h1)", lineHeight: 1.15 }}
            >
              India&apos;s First AI-Powered Preventive Medicine Platform
            </h1>

            {/* Subheadline */}
            <p
              className="text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed"
              style={{ fontSize: "var(--fz-lg)" }}
            >
              Empowering millions to prevent chronic diseases before they strike.
              Combining ancient wisdom with cutting-edge AI to transform healthcare
              from reactive to proactive.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                variant="hero"
                size="xl"
                asChild
                className="transition-all duration-300 hover:-translate-y-[1px] hover:shadow-lg"
              >
                <a href="#contact" className="flex items-center gap-2">
                  Start Your Health Journey
                  <ArrowRight size={18} />
                </a>
              </Button>

              <Button
                variant="hero-outline"
                size="xl"
                asChild
                className="transition-all duration-300 hover:-translate-y-[1px]"
              >
                <a href="#contact">Book a Demo</a>
              </Button>
            </div>
          </div>

          {/* Ultra-Premium Trust Banner */}
          <div
            className="relative mx-auto max-w-4xl rounded-2xl bg-background/80 backdrop-blur-xl border border-border/60 shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
            style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            {/* Soft top glow to anchor with hero */}
            <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-background/80 to-transparent rounded-t-2xl pointer-events-none" />

            <div
              className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center"
              style={{ padding: "clamp(1.25rem, 4vw, 1.75rem) clamp(1.5rem, 5vw, 2.5rem)" }}
            >
              {/* Patients */}
              <div className="space-y-1">
                <div className="text-xs tracking-widest uppercase text-muted-foreground">
                  Patients
                </div>
                <div className="text-muted-foreground" style={{ fontSize: "var(--fz-base)" }}>
                  Trusted by{" "}
                  <strong className="text-foreground font-semibold">10,000+</strong>
                </div>
              </div>

              {/* Hospitals – Primary trust signal */}
              <div className="relative space-y-1">
                <div className="absolute inset-y-0 -left-3 hidden md:block w-px bg-border/60" />
                <div className="absolute inset-y-0 -right-3 hidden md:block w-px bg-border/60" />
                <div className="text-xs tracking-widest uppercase text-muted-foreground">
                  Healthcare Partners
                </div>
                <div className="font-medium text-foreground" style={{ fontSize: "var(--fz-base)" }}>
                  Partnered with{" "}
                  <strong className="font-semibold">50+</strong> hospitals
                </div>
              </div>

              {/* Investors */}
              <div className="space-y-1">
                <div className="text-xs tracking-widest uppercase text-muted-foreground">
                  Backing
                </div>
                <div className="text-muted-foreground" style={{ fontSize: "var(--fz-base)" }}>
                  Backed by{" "}
                  <strong className="text-foreground font-medium">
                    leading healthcare investors
                  </strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
