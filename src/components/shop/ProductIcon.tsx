import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ProductIconProps {
  icon: LucideIcon;
  delay: number;
}

export function ProductIcon({ icon: Icon, delay }: ProductIconProps) {
  return (
    <motion.div
      className="bg-opacity-20 bg-white p-3 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
    >
      <Icon className="w-6 h-6 text-[var(--accent-blue)]" />
    </motion.div>
  );
}
