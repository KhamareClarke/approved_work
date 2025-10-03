import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-950 to-blue-800 text-white pt-16 pb-10 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Brand + summary */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <img src="/logo.svg" alt="Logo" className="w-10 h-10 mr-2" />
            <span className="text-2xl font-extrabold tracking-tight text-yellow-400">MyApproved</span>
          </div>
          <p className="text-blue-100 text-base">Find trusted, approved tradespeople near you. Get fast quotes, compare, and book with confidence.</p>
        </div>

        {/* Three-column footer */}
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="/" className="hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="/find-tradespeople" className="hover:text-yellow-400 transition-colors">Find a tradesperson</a></li>
              <li><a href="/how-it-works" className="hover:text-yellow-400 transition-colors">How it works</a></li>
              <li><a href="/reviews" className="hover:text-yellow-400 transition-colors">Customer reviews</a></li>
              <li><a href="/help" className="hover:text-yellow-400 transition-colors">Help centre</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Locations</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="/electrician-london" className="hover:text-yellow-400 transition-colors">Electricians in London</a></li>
              <li><a href="/plumber-manchester" className="hover:text-yellow-400 transition-colors">Plumbers in Manchester</a></li>
              <li><a href="/roofer-birmingham" className="hover:text-yellow-400 transition-colors">Roofers in Birmingham</a></li>
              <li><a href="/cleaner-leeds" className="hover:text-yellow-400 transition-colors">Cleaners in Leeds</a></li>
              <li><a href="/carpenter-bristol" className="hover:text-yellow-400 transition-colors">Carpenters in Bristol</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-yellow-400">Company</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="/about" className="hover:text-yellow-400 transition-colors">About us</a></li>
              <li><a href="/contact" className="hover:text-yellow-400 transition-colors">Contact</a></li>
              <li><a href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy policy</a></li>
              <li><a href="/terms" className="hover:text-yellow-400 transition-colors">Terms of service</a></li>
              <li><a href="/sitemap.xml" className="hover:text-yellow-400 transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Store badges row */}
        <div className="mt-6 grid md:grid-cols-2 gap-6 items-center">
          <div className="text-left text-blue-100 text-sm leading-7">
            <div className="font-semibold text-blue-50 mb-1">Get the app</div>
            <p className="opacity-80">Book trusted tradespeople faster. Track quotes and jobs on the go.</p>
          </div>
          <div className="flex md:justify-end gap-3 items-center">
            <a href="#" aria-label="Download on the App Store" className="inline-flex">
              <img src="/badges/app-store.svg" alt="Download on the App Store" className="h-10 w-auto" />
            </a>
            <a href="#" aria-label="Get it on Google Play" className="inline-flex">
              <img src="/badges/google-play.svg" alt="Get it on Google Play" className="h-10 w-auto" />
            </a>
            <span className="sr-only">Mobile apps</span>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; 2024 MyApproved. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
