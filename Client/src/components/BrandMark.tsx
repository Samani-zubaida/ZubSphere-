import { motion } from "framer-motion";

interface BrandMarkProps {
  className?: string;
}

const BrandMark = ({ className = "" }: BrandMarkProps) => (
  <motion.h2
    layoutId="zubsphere-brand"
    transition={{ type: "spring", stiffness: 120, damping: 18 }}
    className={`text-[#00D4FF] montenegrin-gothic-one-regular ${className}`}
  >
    {/* ZubSphere */}
  </motion.h2>
);

export default BrandMark;