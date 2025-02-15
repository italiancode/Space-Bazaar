"use client";

import { motion } from "framer-motion";
// import StarryBackground from "@/components/effects/StarryBackground";

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-400">
            Welcome to Space Bazaar! Please read our terms carefully.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Space Bazaar, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">2. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after any changes constitutes your acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
          <p>
            To access certain features of our service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">4. Product Information</h2>
          <p>
            We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, current, or error-free. If a product is not as described, your sole remedy is to return it in unused condition.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">5. Payment and Shipping</h2>
          <p>
            All payments must be made through our designated payment processor. We will ship products to the address you provide during checkout. Shipping times may vary based on your location and the shipping method selected.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">6. Returns and Refunds</h2>
          <p>
            We accept returns within 30 days of purchase. To be eligible for a return, your item must be unused and in the same condition that you received it. Refunds will be processed within a reasonable time after we receive the returned item.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall Space Bazaar, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service or any products purchased.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the state in which Space Bazaar operates, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at support@spacebazaar.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 