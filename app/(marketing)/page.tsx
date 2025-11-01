"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            <span className="text-xl font-bold text-slate-900">Talk-To-My-Lawyer</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth"
              className="px-6 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth"
              className="px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700">Professional Legal Documents</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Generate Legal Letters
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              with Confidence
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Professional legal documents in minutes. Save time, reduce costs, and ensure accuracy with our streamlined platform.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: "⚡", text: "Instant Generation" },
              { icon: "✓", text: "Legally Accurate" },
              { icon: "💰", text: "Cost Effective" },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm"
              >
                <span className="text-2xl">{benefit.icon}</span>
                <span className="text-sm font-medium text-slate-700">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/auth")}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Start Creating Letters
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:border-slate-400 transition-all"
            >
              Already have an account?
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Three simple steps to get your legal document</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: "📄",
                title: "Choose Your Letter Type",
                description: "Select from demand letters, notices, or responses based on your needs",
              },
              {
                step: "2",
                icon: "✍️",
                title: "Fill in the Details",
                description: "Our smart form guides you through the required information with helpful tips",
              },
              {
                step: "3",
                icon: "✓",
                title: "Review & Download",
                description: "Get your professionally formatted legal document ready to send in minutes",
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600">Professional legal documents for every situation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚖️",
                title: "Demand Letters",
                features: ["Custom templates", "Legal formatting", "Instant generation"],
              },
              {
                icon: "📋",
                title: "Notice Letters",
                features: ["Multiple formats", "Compliance checking", "Professional tone"],
              },
              {
                icon: "✉️",
                title: "Response Letters",
                features: ["Strategic language", "Time-sensitive handling", "Legally sound content"],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-blue-400 transition-all hover:shadow-lg"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-2 text-slate-600">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Trusted by thousands of clients</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "10K+", label: "Documents Generated" },
              { value: "95%", label: "Customer Satisfaction" },
              { value: "24/7", label: "Available Anytime" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xl text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Create Your Legal Letter?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of users who trust Talk-To-My-Lawyer for their legal document needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: "🔒", text: "Secure & Private" },
              { icon: "⚡", text: "Instant Delivery" },
              { icon: "✓", text: "Legally Compliant" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg"
              >
                <span className="text-xl">{feature.icon}</span>
                <span className="text-sm font-medium text-slate-700">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/auth")}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:border-slate-400 transition-all"
            >
              Already have an account?
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2025 Talk-To-My-Lawyer. Professional legal document generation
          </p>
        </div>
      </footer>
    </main>
  )
}
