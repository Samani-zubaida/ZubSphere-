import { motion } from "framer-motion";

interface ProjectCardBackProps {
  accent: string;
}

const ProjectCardBack = ({ accent }: ProjectCardBackProps) => {
  return (
    <motion.div
      animate={{
        backgroundColor: `${accent}22`,
        borderColor: `${accent}55`,
      }}
      transition={{ duration: 0.8 }}
      className="absolute -right-6 top-6 w-full h-full rounded-2xl border"
      style={{
        transform: "rotateY(-22deg) rotateX(4deg) translateZ(-40px)",
        transformStyle: "preserve-3d",
      }}
    />
  );
};

export default ProjectCardBack;