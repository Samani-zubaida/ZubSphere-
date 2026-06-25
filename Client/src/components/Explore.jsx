import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
} from "react-icons/fa";

const projects = [
  {
    title: "Imagify",
    description:
      "An AI-powered full-stack application for generating, enhancing, and managing images, featuring a seamless user experience, secure authentication, and efficient cloud-based processing.",
    tech: ["React", "Node.js", "MongoDB", "Gemini API","Cloudinary"],
    status: "Completed",
    github: "https://github.com/Samani-zubaida/imagify",
    demo: "https://imagify-bice-omega.vercel.app/",
  },
  {
    
  title: "ChitChat",
  description:
    "A modern MERN-based messaging application featuring Socket.IO real-time chat, secure JWT authentication, email integration, and responsive UI design for seamless user communication.",
  tech: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
    status: "Completed",
    github: "https://github.com/Samani-zubaida/chit-Chat",
    demo: "https://chit-chat-seven-tan.vercel.app/login",
  },
  {
  title: "WayPoint",
  description:
    "A full-stack AI-powered location intelligence platform that combines place discovery, community engagement, real-time communication, navigation services, and conversational AI to deliver an interactive location-based experience.",
  tech: [
    "React",
    "Node.js",
    "Express",
    "Tailwind",
    "MongoDB",
    "Gemini API",
    "Google Maps API",
    "Socket.IO"
  ],
    status: "In Progress",
    github: "#",
    demo: "#",
  },
];

const Explore = () => {
  return (
    <section className="min-h-screen bg-slate-100 py-24 px-6 md:px-16 relative overflow-hidden">

      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/40 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/40 blur-[150px] rounded-full"></div>

      <div className="relative z-10">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >

          <p className="text-cyan-600 tracking-[4px] uppercase font-semibold mb-3">
            Portfolio
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-5">
            Featured Projects
          </h1>

          <div className="w-28 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full"></div>

          <p className="max-w-3xl mx-auto text-slate-600 mt-6 text-lg leading-relaxed">
            A collection of projects showcasing my passion for software
            engineering, AI development, and building impactful digital
            experiences.
          </p>

        </motion.div>

        {/* Projects Grid */}

        <div className="grid lg:grid-cols-3 gap-8">

          {projects.map((project, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-8
                shadow-[0_20px_50px_rgba(15,23,42,0.08)]
                hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]
                transition-all
                duration-300
              "
            >

              {/* Top Row */}

              <div className="flex justify-between items-center mb-6">

                <div className="bg-cyan-50 p-3 rounded-xl">

                  <FaCode className="text-cyan-600 text-xl" />

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {project.status}
                </span>

              </div>

              {/* Title */}

              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {project.title}
              </h2>

              {/* Description */}

              <p className="text-slate-600 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech Stack */}

              <div className="flex flex-wrap gap-2 mb-8">

                {project.tech.map((tech, i) => (

                  <span
                    key={i}
                    className="
                      bg-slate-100
                      text-slate-700
                      px-3
                      py-1
                      rounded-lg
                      text-sm
                      border
                      border-slate-200
                    "
                  >
                    {tech}
                  </span>

                ))}

              </div>

              {/* Buttons */}

              <div className="flex gap-3">

                <a
                  href={project.github}
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-slate-100
                    hover:bg-slate-200
                    text-slate-700
                    px-4
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  <FaGithub />
                  GitHub
                </a>

                <a
                  href={project.demo}
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-gradient-to-r
                    from-cyan-600
                    to-indigo-600
                    text-white
                    px-4
                    py-3
                    rounded-xl
                    transition
                    hover:scale-[1.02]
                  "
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </a>

              </div>

            </motion.div>

          ))}

        </div>

        {/* Bottom Section */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-24"
        >

          <h3 className="text-3xl font-bold text-slate-900 mb-4">
            Building More Every Day
          </h3>

          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            I'm continuously exploring new technologies, AI tools,
            and full-stack development to create innovative and impactful
            solutions. Every project helps me learn, improve, and build
            better software experiences.
          </p>

        </motion.div>

      </div>

    </section>
  );
};

export default Explore;