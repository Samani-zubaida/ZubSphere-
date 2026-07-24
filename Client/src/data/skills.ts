import type { IconType } from "react-icons";
import { FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt } from "react-icons/fa";
import { SiMongodb, SiTensorflow } from "react-icons/si";
import { FiCode } from "react-icons/fi";

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export const skills: Skill[] = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Node.js", icon: FaNodeJs, color: "#8CC84B" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "Java", icon: FaJava, color: "#f89820" },
  { name: "Machine Learning", icon: SiTensorflow, color: "#FF6F00" },
  { name: "DSA", icon: FiCode, color: "#00D4FF" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  
];