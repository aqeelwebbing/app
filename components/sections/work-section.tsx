"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      {/* Floating decoration */}
      <div className="pointer-events-none absolute right-[5%] top-[15%] h-48 w-48 animate-[float_8s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left side - Heading */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="group mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                  How it
                </span>
                <br />
                <span className="relative inline-block text-foreground/40 transition-all duration-500 group-hover:text-foreground/60">
                  works
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-500 group-hover:w-full" />
                </span>
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Creating professional legal documents has never been easier. Our platform guides you through
                every step with precision and clarity.
              </p>
            </div>
          </div>

          {/* Right side - Steps */}
          <div className="flex items-center">
            <div className="relative w-full space-y-4 md:space-y-6">
              {/* Connection Line */}
              <div className="absolute left-6 top-10 hidden h-[calc(100%-80px)] w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent md:block" />

              {[
                {
                  number: "01",
                  title: "Choose Your Letter Type",
                  description: "Select from demand letters, notices, or responses based on your needs",
                  icon: "📄",
                },
                {
                  number: "02",
                  title: "Fill in the Details",
                  description: "Our smart form guides you through the required information with helpful tips",
                  icon: "✍️",
                },
                {
                  number: "03",
                  title: "Review & Download",
                  description: "Get your professionally formatted legal document ready to send in minutes",
                  icon: "✓",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:bg-foreground/10 hover:scale-[1.02] hover:shadow-2xl md:p-8">
                    {/* Number Badge with pulse */}
                    <div className="absolute -left-2 top-8 flex h-12 w-12 items-center justify-center rounded-full border-2 border-foreground/20 bg-background/80 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-foreground/40">
                      <span className="font-mono text-sm font-semibold text-foreground/80">{step.number}</span>
                      <div className="absolute inset-0 animate-[pulse-slow_2s_ease-in-out_infinite] rounded-full border-2 border-foreground/20" />
                    </div>

                    <div className="relative z-10 pl-10">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                          {step.icon}
                        </span>
                        <h3 className="text-xl font-light text-foreground transition-colors duration-300 group-hover:text-foreground md:text-2xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90 md:text-base">
                        {step.description}
                      </p>
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {/* Corner accent */}
                    <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-orange-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
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
