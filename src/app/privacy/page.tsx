"use client";

import { motion } from "framer-motion";
// import StarryBackground from "@/components/effects/StarryBackground";

export default function Privacy() {
  return (
    <div className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      {/* <StarryBackground className="z-0" /> */}
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-400">
            Your privacy is important to us. Please read our policy carefully.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
          <p>
            We collect information from you when you visit our site, place an order, subscribe to our newsletter, or interact with us in other ways. This information may include your name, email address, phone number, shipping address, and payment information.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Process and fulfill your orders.</li>
            <li>Improve our website and services.</li>
            <li>Send periodic emails regarding your order or other products and services.</li>
            <li>Respond to your inquiries and support needs.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">3. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties without your consent, except to provide services you have requested or as required by law.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
          <p>
            You have the right to request access to the personal information we hold about you, to request corrections to that information, and to request the deletion of your personal information. To exercise these rights, please contact us at support@spacebazaar.com.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
          <p>
            Our website uses cookies to enhance user experience. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser setting to decline cookies if you prefer.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account or by placing a prominent notice on our site.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@spacebazaar.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 