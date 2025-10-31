"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import { useState, useEffect } from "react"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [counters, setCounters] = useState({ documents: 0, satisfaction: 0 })

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const documentsTarget = 50000
    const satisfactionTarget = 98

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounters({
        documents: Math.floor(documentsTarget * progress),
        satisfaction: Math.floor(satisfactionTarget * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCounters({ documents: documentsTarget, satisfaction: satisfactionTarget })
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-[15%] top-[25%] h-56 w-56 animate-[float_9s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="group mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                  Trusted by
                </span>
                <br />
                <span className="inline-block transition-transform duration-500 delay-75 group-hover:translate-x-2">
                  thousands of
                </span>
                <br />
                <span className="relative inline-block text-foreground/40 transition-all duration-500 delay-150 group-hover:translate-x-2 group-hover:text-foreground/60">
                  clients
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-500 group-hover:w-full" />
                </span>
              </h2>
            </div>

            <div
              className={`space-y-4 transition-all duration-700 md:space-y-5 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Join thousands of clients who trust Talk-To-My-Lawyer for their legal document needs. Our platform
                makes professional legal letters accessible to everyone.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/70 md:text-lg">
                We believe technology should empower everyone with legal tools. That&apos;s why we created an intuitive
                platform that combines advanced capabilities with user-friendly design.
              </p>
            </div>

            <div
              className={`mt-6 flex flex-col gap-3 transition-all duration-700 md:mt-8 md:gap-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection?.(4)}>
                Get Started Today
              </MagneticButton>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="flex items-center">
            <div className="grid w-full gap-6 md:gap-8">
              {[
                {
                  number: counters.documents >= 50000 ? "50K+" : `${Math.floor(counters.documents / 1000)}K+`,
                  label: "Documents Generated",
                  icon: "📄",
                  gradient: "from-blue-500/5 to-cyan-500/5",
                },
                {
                  number: `${counters.satisfaction}%`,
                  label: "Customer Satisfaction",
                  icon: "⭐",
                  gradient: "from-orange-500/5 to-amber-500/5",
                },
                { number: "24/7", label: "Available Anytime", icon: "🕐", gradient: "from-purple-500/5 to-pink-500/5" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:bg-foreground/10 hover:scale-105 hover:shadow-2xl md:p-8">
                    {/* Icon */}
                    <div className="absolute right-6 top-6 text-3xl opacity-20 transition-all duration-500 group-hover:scale-125 group-hover:opacity-30 md:text-4xl">
                      {stat.icon}
                    </div>

                    <div className="relative z-10">
                      <h3 className="mb-2 font-sans text-4xl font-light leading-none text-foreground transition-all duration-300 group-hover:scale-105 md:text-6xl">
                        {stat.number}
                      </h3>
                      <p className="text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90 md:text-base">
                        {stat.label}
                      </p>
                    </div>

                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {/* Corner glow */}
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-foreground/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
