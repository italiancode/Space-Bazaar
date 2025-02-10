"use client";

import { motion } from "framer-motion";
import StarryBackground from "@/components/effects/StarryBackground";

export default function FAQs() {
  return (
    <div className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <StarryBackground className="z-0" />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400">
            Have questions? We have answers!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">1. What is Space Bazaar?</h2>
            <p className="text-gray-400">
              Space Bazaar is an online marketplace dedicated to providing authentic SpaceX merchandise and space-themed products to enthusiasts and supporters of space exploration.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">2. How can I place an order?</h2>
            <p className="text-gray-400">
              To place an order, simply browse our collection, select the items you wish to purchase, and follow the checkout process. You will need to provide your shipping and payment information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">3. What payment methods do you accept?</h2>
            <p className="text-gray-400">
              We accept various payment methods, including credit cards, debit cards, and PayPal. All transactions are processed securely.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">4. How long does shipping take?</h2>
            <p className="text-gray-400">
              Shipping times vary based on your location and the shipping method selected. Typically, orders are processed within 1-3 business days, and delivery can take anywhere from 3 to 10 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">5. Can I return an item?</h2>
            <p className="text-gray-400">
              Yes, we accept returns within 30 days of purchase. To be eligible for a return, the item must be unused and in the same condition that you received it. Please refer to our Returns and Refunds policy for more details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">6. How can I contact customer support?</h2>
            <p className="text-gray-400">
              You can reach our customer support team by emailing support@spacebazaar.com. We aim to respond to all inquiries within 24 hours.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">7. Do you offer international shipping?</h2>
            <p className="text-gray-400">
              Yes, we offer international shipping to select countries. Shipping costs and delivery times may vary based on your location.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">8. How can I stay updated on new products and promotions?</h2>
            <p className="text-gray-400">
              You can subscribe to our newsletter at the bottom of our website to receive updates on new products, promotions, and exclusive offers.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}