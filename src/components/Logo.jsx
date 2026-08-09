import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="logo">
      <motion.div
        className="logo-circle"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
      />
    </div>
  );
}