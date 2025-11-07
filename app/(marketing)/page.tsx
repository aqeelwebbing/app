"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <span className="text-3xl">⚖️</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">talk-to-my-lawyer</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#letter-types" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
              Letter Types
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="/auth?mode=signup" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Need a Lawyer&apos;s Voice{" "}
            <span className="text-blue-500">Without the Legal Bill?</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-4">
            Get local attorneys to send your legal letter in 48 hours for $199.
          </p>

          <p className="text-base text-gray-600 mb-8 max-w-3xl mx-auto">
            Get professional lawyer-drafted letters for tenant disputes, debt collection, HR issues, and more.
            Resolve conflicts quickly and affordably with the power of legal communication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => router.push("/auth?mode=signup")}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Get Started Now
            </button>
            <button
              onClick={() => router.push("#letter-types")}
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md border-2 border-blue-600 hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Letter Types
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 font-medium">Affordable</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 font-medium">24-48 Hour Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 font-medium">Lawyer Reviewed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Importance Section */}
      <section className="bg-red-50 border-y border-red-200 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-red-800">Important Notice</h2>
          </div>
          <p className="text-lg text-red-700 font-medium mb-4">
            Self-drafted or AI-generated letters are <strong>not effective</strong> and are often ignored by recipients.
          </p>
          <p className="text-gray-700 mb-6">
            Legal letters must be on professional lawyer letterhead to be taken seriously. All our letters are
            <strong> custom-drafted by licensed attorneys</strong> and delivered on official law firm letterhead
            for maximum impact and credibility.
          </p>
          <div className="bg-white rounded-lg border border-red-200 p-6 shadow-sm">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-700 font-semibold">Professional Solution</span>
            </div>
            <p className="text-gray-700">
              <strong>Choose professional legal representation</strong> to ensure your letter gets the attention it deserves and achieves the results you need.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">1,000+</div>
            <div className="text-blue-200 text-sm md:text-base">Letters Delivered</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">95%</div>
            <div className="text-blue-200 text-sm md:text-base">Attorney Reviewed</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
            <div className="text-blue-200 text-sm md:text-base">Licensed Attorneys</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">24-48</div>
            <div className="text-blue-200 text-sm md:text-base">Hour Delivery</div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-blue-200 text-sm">
            <em>*Statistics based on verified service delivery data. Individual results may vary.</em>
          </p>
        </div>
      </section>

      {/* Professional Legal Letters Section */}
      <section id="letter-types" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-sm text-blue-600 font-semibold">Professional Service</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Professional Legal Letters
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Choose from our comprehensive library of lawyer-drafted letter templates. Each letter is customized
            for your specific situation and reviewed by licensed attorneys.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🏠",
                title: "Tenant Disputes",
                description: "Security deposits, lease violations, habitability issues, and more.",
                price: "$49",
              },
              {
                icon: "💼",
                title: "HR & Employment",
                description: "Workplace issues, wrongful termination, wage disputes, and more.",
                price: "$99",
              },
              {
                icon: "📈",
                title: "Debt Collection",
                description: "Business recovery from clients, customers, or vendors.",
                price: "$39",
              },
              {
                icon: "👤",
                title: "Personal Disputes",
                description: "Neighbor disputes, contract breaches, personal injury claims.",
                price: "$45",
              },
              {
                icon: "🏢",
                title: "Property Issues",
                description: "Property damage, boundary disputes, easement issues.",
                price: "$55",
              },
              {
                icon: "⏰",
                title: "Cease & Desist",
                description: "Harassment, defamation, copyright infringement, and more.",
                price: "$65",
              },
              {
                icon: "⚖️",
                title: "Settlement Discussion",
                description: "Negotiation support, dispute resolution, and agreement proposals.",
                price: "$75",
              },
            ].map((letterType, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{letterType.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{letterType.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{letterType.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">Starting at {letterType.price}</span>
                  <button
                    onClick={() => router.push("/auth?mode=signup")}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors inline-flex items-center gap-1"
                  >
                    Select This Type
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Today Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
            Get Started Today
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Start your letter or log into your account to manage existing letters
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Request Service Form */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-blue-600 text-center mb-2">
                Request Service Now
              </h3>
              <p className="text-center mb-1">
                <span className="text-green-600 font-semibold">Affordable legal services!</span>{" "}
                <span className="text-gray-700">Professional letters starting at just $50.</span>
              </p>

              <p className="text-sm text-gray-600 mb-6 text-center">
                Let&apos;s see if we can help. Complete the form below to request a local law firm draft and deliver your letter.
                We&apos;ll handle the rest.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                <p className="text-sm text-gray-800">
                  <span className="font-bold">* DISCLAIMER:</span> We receive 100&apos;s of requests. If you&apos;re serious and ready to
                  move forward immediately, please complete the form below and pay very careful attention to the instructions
                  provided on the following page.
                </p>
              </div>

              <button
                onClick={() => router.push("/auth?mode=signup")}
                className="w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Generate Letter Preview
              </button>
            </div>

            {/* Login Panel */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-8">
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button className="pb-3 px-4 text-blue-600 font-semibold border-b-2 border-blue-600">
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth?mode=signup")}
                  className="pb-3 px-4 text-gray-500 hover:text-gray-700"
                >
                  Register
                </button>
                <button
                  onClick={() => router.push("/auth?mode=signup")}
                  className="pb-3 px-4 text-gray-500 hover:text-gray-700"
                >
                  Register with Coupon
                </button>
                <button className="pb-3 px-4 text-gray-500 hover:text-gray-700">
                  About
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="et000han@webbingdesigns.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value="••••••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>

                <button
                  onClick={() => router.push("/auth")}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚖️</span>
                <span className="font-bold text-lg">LegalLetters.com</span>
              </div>
              <p className="text-blue-200 text-sm mb-4">
                Professional legal letters delivered by licensed attorneys.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link href="#letter-types" className="hover:text-white transition-colors">Tenant Disputes</Link></li>
                <li><Link href="#letter-types" className="hover:text-white transition-colors">Debt Collection</Link></li>
                <li><Link href="#letter-types" className="hover:text-white transition-colors">Employment Issues</Link></li>
                <li><Link href="#letter-types" className="hover:text-white transition-colors">Contract Disputes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  1-800-LETTERS
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  help@legalletters.com
                </li>
                <li className="text-blue-200">Available Nationwide</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-700 pt-8 text-center text-sm text-blue-200">
            <p>© 2025 LegalLetters.com. All rights reserved. | <Link href="#" className="hover:text-white">Privacy Policy</Link> | <Link href="#" className="hover:text-white">Terms of Service</Link> | <Link href="#" className="hover:text-white">Refund Policy</Link></p>
          </div>
        </div>
      </footer>
    </main>
  )
}
