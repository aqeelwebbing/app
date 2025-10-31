"use client"

import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useRouter } from "next/navigation"

export function ContactSection() {
  const router = useRouter()
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[20%] h-40 w-40 animate-[float_7s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl" />
        <div className="absolute right-[20%] bottom-[30%] h-48 w-48 animate-[float_9s_ease-in-out_infinite_2s] rounded-full bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl" />
        <div className="absolute left-[50%] top-[10%] h-32 w-32 animate-[float_8s_ease-in-out_infinite_1s] rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl text-center">
        {/* Animated border box */}
        <div className="absolute -inset-4 rounded-3xl border border-foreground/5 bg-gradient-to-b from-foreground/5 to-transparent opacity-50 backdrop-blur-sm" />

        <div className="relative">
          <div
            className={`mb-8 transition-all duration-700 md:mb-12 ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
            }`}
          >
            <h2 className="group mb-4 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-6 md:text-7xl lg:text-8xl">
              <span className="inline-block transition-transform duration-500 group-hover:scale-105">
                Ready to Create Your
              </span>
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
                  Legal Letter?
                </span>
                <span className="absolute -bottom-2 left-1/2 h-3 w-3/4 -translate-x-1/2 animate-[morphWidth_3s_ease-in-out_infinite] bg-gradient-to-r from-blue-500/20 to-orange-500/20 blur-lg" />
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/80 md:text-xl">
              Join thousands of users who trust Talk-To-My-Lawyer for their legal document needs.
            </p>
          </div>

          {/* Trust badges */}
          <div
            className={`mb-8 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 md:gap-6 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            {[
              { icon: "🔒", text: "Secure & Private" },
              { icon: "⚡", text: "Instant Delivery" },
              { icon: "✓", text: "Legally Compliant" },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-foreground/20 hover:bg-foreground/10"
              >
                <span className="text-lg transition-transform duration-300 group-hover:scale-110">{badge.icon}</span>
                <span className="text-xs font-medium text-foreground/90 md:text-sm">{badge.text}</span>
              </div>
            ))}
          </div>

          <div
            className={`flex flex-col items-center gap-4 transition-all duration-700 md:gap-6 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <MagneticButton
              size="lg"
              variant="primary"
              className="w-full max-w-md shadow-lg shadow-blue-500/20 transition-shadow hover:shadow-xl hover:shadow-blue-500/30"
              onClick={() => router.push("/auth")}
            >
              Get Started Now
            </MagneticButton>
            <MagneticButton
              size="lg"
              variant="secondary"
              className="w-full max-w-md"
              onClick={() => router.push("/auth")}
            >
              Already have an account?
            </MagneticButton>
          </div>

          <div
            className={`mt-12 border-t border-foreground/10 pt-8 transition-all duration-700 md:mt-16 md:pt-12 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="group mb-4 flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-orange-500/20 transition-transform duration-300 group-hover:scale-110">
                <span className="font-sans text-lg font-bold text-foreground">T</span>
              </div>
              <span className="font-sans text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-foreground/80">
                Talk-To-My-Lawyer
              </span>
            </div>
            <p className="font-mono text-xs text-foreground/60 md:text-sm">
              © 2025 Talk-To-My-Lawyer. Professional legal document generation
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
