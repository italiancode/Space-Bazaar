"use client";

import { motion } from "framer-motion";
import { Rocket, Shield, Users, Star } from "lucide-react";
// import StarryBackground from "@/components/effects/StarryBackground";

export default function About() {
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
            About Space Bazaar
          </h1>
          <p className="text-xl text-gray-400">
            Bridging Earth and Space Through Commerce
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none mb-16"
        >
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            {
              "Space Bazaar was born from a passion for space exploration and the desire to make space-related merchandise accessible to enthusiasts worldwide. We believe that every purchase is more than just a transaction—it's an investment in humanity's future among the stars."
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "Authenticity Guaranteed",
                description:
                  "Every item in our collection is verified authentic SpaceX merchandise.",
              },
              {
                icon: Rocket,
                title: "Mission Support",
                description:
                  "A portion of every sale supports space exploration initiatives.",
              },
              {
                icon: Users,
                title: "Community First",
                description:
                  "Built by space enthusiasts, for space enthusiasts.",
              },
              {
                icon: Star,
                title: "Quality Assured",
                description:
                  "Rigorous quality control for every product we offer.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                  backdrop-blur-md border border-gray-700/50 
                  hover:border-indigo-500/50 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-gray-300 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p>
              {
                "We envision a future where space exploration is not just a dream but a shared human endeavor. Space Bazaar serves as a bridge between space enthusiasts and authentic SpaceX merchandise, fostering a community that actively participates in humanity's journey to the stars."
              }
            </p>
            <p>
              {
                "Through our platform, we're not just selling products—we're fueling dreams, supporting innovation, and building a community of space enthusiasts who believe in a multi-planetary future for humanity."
              }
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
