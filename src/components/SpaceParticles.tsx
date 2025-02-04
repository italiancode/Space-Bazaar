import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";

export const SpaceParticles = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Featured Product Card */}
      <motion.div
        className="absolute top-4 left-4 z-30 bg-blue-500/10 backdrop-blur-md rounded-lg p-4 border border-blue-500/20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex items-center gap-2 text-white/90 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">Most Purchased Product</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-blue-400/20 flex items-center justify-center">
            <img 
              src="https://shop.spacex.com/cdn/shop/files/Unisex_SpaceX_PulloverHoodie_Charcoal_Front_600x.png?v=1731544477" 
              alt="Featured SpaceX Product"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">SpaceX Hoodie</h3>
            <p className="text-blue-200 text-xs">$299.99</p>
          </div>
        </div>
      </motion.div>

      {/* Larger orbit rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-blue-500/10 rounded-full"
          style={{
            width: `${ring * 250}px`,
            height: `${ring * 250}px`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20 + ring * 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Enhanced central marketplace hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-blue-500/10 backdrop-blur-md"
        style={{
          boxShadow: '0 0 80px 40px rgba(59, 130, 246, 0.15)',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShoppingCart className="w-20 h-20 text-white/80" />
        </motion.div>
      </motion.div>

      {/* Additional glow effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default SpaceParticles; 