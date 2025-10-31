"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const letterTypes = [
    {
      title: "Tenant Disputes",
      price: "$49",
      description: "Security deposits, lease violations, habitability",
    },
    {
      title: "HR & Employment",
      price: "$59",
      description: "Workplace harassment, wrongful termination",
    },
    {
      title: "Debt Collection",
      price: "$39",
      description: "Collect money owed",
    },
    {
      title: "Personal Disputes",
      price: "$45",
      description: "Neighbor disputes, contract breaches",
    },
    {
      title: "Property Issues",
      price: "$55",
      description: "Property damage, boundary disputes",
    },
    {
      title: "Cease & Desist",
      price: "$65",
      description: "Stop harassment, defamation, copyright issues",
    },
  ];

  const trustIndicators = [
    "No Legal Fees",
    "24-48 Hour Delivery",
    "Lawyer Reviewed",
    "10,000+ Letters Delivered",
    "95% Success Rate",
    "50+ Licensed Attorneys",
    "24 Hours Average Delivery",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                talk-to-my-lawyer
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-gray-900">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-gray-900">
                How it Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-gray-900">
                Pricing
              </a>
              <a href="#get-started" className="text-gray-700 hover:text-gray-900">
                Get Started
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/auth")}
                className="text-gray-700 hover:text-gray-900 px-4 py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/auth")}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Need a Lawyer&apos;s Voice Without the Legal Bill?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional, lawyer-drafted letters for tenant disputes, debt collection, HR issues, and more.
              Resolve conflicts affordably with legal communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/auth")}
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
              >
                Get Started Now
              </button>
              <button
                onClick={() => router.push("#services")}
                className="bg-gray-200 text-gray-900 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-300"
              >
                View Letter Types
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-center text-center">
                <div>
                  <div className="text-green-600 mb-2">✓</div>
                  <p className="text-sm text-gray-700 font-medium">{indicator}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Popular</h2>
            <p className="text-lg text-gray-600">Choose the letter type that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {letterTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">Starting {type.price}</p>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <button
                  onClick={() => router.push("/auth")}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
                >
                  Select This Type
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="get-started" className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get Started Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Create an account to start generating professional legal letters
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/auth")}
              className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-800 border-2 border-white"
            >
              Register
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Services */}
            <div>
              <h3 className="text-white font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Tenant Disputes</a></li>
                <li><a href="#" className="hover:text-white">HR Issues</a></li>
                <li><a href="#" className="hover:text-white">Debt Collection</a></li>
                <li><a href="#" className="hover:text-white">Cease & Desist</a></li>
                <li><a href="#" className="hover:text-white">Settlement Talks</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Legal Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="/dashboard" className="hover:text-white">My Letters</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>support@legalletters.com</li>
                <li>1-800-LETTERS</li>
                <li>Available Nationwide</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © 2025 LegalLetters.com
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
