import { motion } from "framer-motion";
import { popIn } from "../animations/variants.js";

export default function CyberCard({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      variants={popIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={`glass-panel hud-panel rounded-lg p-5 ${className}`}
    >
      {children}
    </motion.section>
  );
}
