import Link from "next/link";
import FadeGlowEffect from '../effects/FadeGlowEffect';

export default function Footer() {
  return (
    <>
      <FadeGlowEffect />
      <footer className="bg-background mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Space Bazaar</h3>
              <p className="text-sm text-gray-400">
                Supporting space exploration through commerce
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-lg font-bold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} Space Bazaar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    title: "Shop",
    links: [
      { name: "All Collections", href: "/shop/collections" },
      { name: "Categories", href: "/shop/categories" },
      // { name: "New Arrivals", href: "/new-arrivals" },
      // { name: "Best Sellers", href: "/best-sellers" },
    ],

  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      // { name: "Shipping", href: "/shipping" },
      // { name: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      // { name: "Mission", href: "/mission" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];
