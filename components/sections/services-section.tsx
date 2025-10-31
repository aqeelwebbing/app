"use client"

import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  const services = [
    {
      title: "Demand Letters",
      description: "Professional demand letters for unpaid debts, property disputes, and contract breaches",
      features: ["Custom templates", "Legal formatting", "Instant generation"],
      icon: "⚖️",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Notice Letters",
      description: "Formal notices for lease terminations, employment issues, and legal notifications",
      features: ["Multiple formats", "Compliance checked", "Professional tone"],
      icon: "📋",
      gradient: "from-orange-500/10 to-amber-500/10",
    },
    {
      title: "Response Letters",
      description: "Expert responses to legal demands, complaints, and official notices",
      features: ["Strategic language", "Time-sensitive", "Legally sound"],
      icon: "✉️",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[10%] bottom-[20%] h-64 w-64 animate-[float_10s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-orange-500/5 to-transparent blur-3xl" />

      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="group mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">Our</span>
            <br />
            <span className="relative inline-block text-foreground/40 transition-all duration-500 group-hover:text-foreground/60">
              Services
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-500 group-hover:w-full" />
            </span>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/90 md:text-lg">
            Professional legal documents tailored to your needs. Generate accurate, legally-sound letters in minutes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="group relative h-full overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:bg-foreground/10 hover:scale-105 hover:shadow-2xl md:p-8">
                {/* Icon badge */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-foreground/20">
                  {service.icon}
                </div>

                <div className="relative z-10 flex h-full flex-col">
                  <h3 className="mb-3 text-xl font-light text-foreground transition-colors duration-300 group-hover:text-foreground md:mb-4 md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mb-6 flex-grow text-sm leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90 md:text-base">
                    {service.description}
                  </p>

                  {/* Features with animated bullets */}
                  <ul className="space-y-2.5">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="group/item flex items-center gap-3 text-sm text-foreground/90">
                        <div className="relative flex h-5 w-5 items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-foreground/60 transition-all duration-300 group-hover/item:scale-150 group-hover/item:bg-foreground" />
                          <div className="absolute inset-0 rounded-full border border-foreground/20 transition-all duration-300 group-hover/item:scale-125 group-hover/item:border-foreground/40" />
                        </div>
                        <span className="transition-transform duration-300 group-hover/item:translate-x-1">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-foreground/5 to-transparent transition-transform duration-700 group-hover:translate-y-full" />

                {/* Corner glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-foreground/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
