"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
// import StarryBackground from "@/components/effects/StarryBackground";
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    // Add your form submission logic here
    // For now, we'll simulate a submission
    setTimeout(() => setFormStatus('sent'), 1000);
  };

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
            Contact Space Bazaar
          </h1>
          <p className="text-xl text-gray-400">
            Have questions? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Email Us</h3>
                  <p className="text-gray-400">support@spacebazaar.com</p>
                  <p className="text-sm text-gray-500">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Call Us</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">
                    Mon-Fri from 9am to 6pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Location</h3>
                  <p className="text-gray-400">123 Space Street</p>
                  <p className="text-gray-400">Cape Canaveral, FL 32920</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 
                    text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 
                    text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 
                    text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending' || formStatus === 'sent'}
                className={`w-full px-6 py-3 rounded-lg text-white font-medium
                  transition-all duration-300 ${
                    formStatus === 'sent'
                      ? 'bg-green-600'
                      : 'bg-gradient-to-r from-accent-blue to-accent-purple hover:from-accent-purple hover:to-accent-blue'
                  }`}
              >
                {formStatus === 'sending'
                  ? 'Sending...'
                  : formStatus === 'sent'
                  ? 'Message Sent!'
                  : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
