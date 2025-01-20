import { motion } from "framer-motion";

export const SpaceParticles = () => {
  return (
    <div className="relative w-full h-full">
      {/* Orbital rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-blue-500/20 rounded-full"
          style={{
            width: `${ring * 150}px`,
            height: `${ring * 150}px`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10 + ring * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Central glowing orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-500"
        style={{
          boxShadow: '0 0 40px 20px rgba(59, 130, 246, 0.3)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating rocket */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" className="text-white">
          <path
            d="M12 2L8 7H16L12 2Z"
            fill="currentColor"
          />
          <rect
            x="10"
            y="7"
            width="4"
            height="12"
            fill="currentColor"
          />
          <path
            d="M8 19L12 22L16 19H8Z"
            fill="currentColor"
          />
          <path
            d="M7 14L4 17M17 14L20 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}; 