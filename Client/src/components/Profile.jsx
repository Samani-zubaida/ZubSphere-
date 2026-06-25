import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Education from "./Education";

const Profile = () => {
  const text = "Hello, I'm Zubaida Samani";

  const navigate = useNavigate();

  const [displayText, setDisplayText] = useState("");
  const [showIntro, setShowIntro] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    setDisplayText("");
    setShowIntro(false);

    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));

      index++;

      if (index === text.length) {
        clearInterval(interval);

        setTimeout(() => {
          setShowIntro(true);
        }, 300);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/40 blur-[150px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 blur-[150px] rounded-full" />

      {/* Profile Section */}

      <div className="min-h-screen pt-24 md:pt-0 flex items-center justify-center px-4 md:px-10 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="
            w-full
            max-w-6xl
            mx-auto
            bg-white
            border
            border-slate-200
            rounded-[24px]
            px-5
            md:px-10
            py-6
            md:py-8
            shadow-[0_20px_60px_rgba(15,23,42,0.08)]
            flex
            flex-col
            md:flex-row
            items-center
            gap-6
            md:gap-8
          "
        >
          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />

              <img
                src="self.png"
                alt="Zubaida Samani"
                className="
                  relative
                  w-40
                  h-40
                  sm:w-48
                  sm:h-48
                  md:w-72
                  md:h-72
                  object-cover
                  rounded-full
                  border-4
                  border-white
                  shadow-xl
                "
              />
            </div>
          </motion.div>

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <p className="uppercase tracking-[4px] text-slate-500 text-xs md:text-sm font-semibold mb-3">
              Full Stack Developer • AI Enthusiast
            </p>

            {/* Name */}

            <h1
              className="
                text-xl
                sm:text-2xl
                md:text-5xl
                font-extrabold
                bg-gradient-to-r
                from-cyan-600
                to-blue-600
                bg-clip-text
                text-transparent
                mb-5
                whitespace-nowrap
              "
            >
              {displayText}
              <span className="animate-pulse text-cyan-500">|</span>
            </h1>

            {/* Description */}

            <p
              className={`
                text-slate-600
                text-sm
                md:text-lg
                leading-7
                md:leading-8
                max-w-2xl
                transition-all
                duration-1000
                ${
                  showIntro
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }
              `}
            >
              I am a Computer Engineering student who enjoys building web applications and exploring AI/ML technologies. My work focuses on creating practical projects while continuously strengthening my software development skills.
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
              <button
                className="
                  px-6
                  py-3
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  text-white
                  font-semibold
                  shadow-lg
                  hover:scale-105
                  transition-all
                  duration-300
                "
                onClick={() => navigate("/explore")}
              >
                Explore Projects
              </button>

              <button
                className="
                  px-6
                  py-3
                  rounded-full
                  bg-white
                  border
                  border-slate-300
                  text-slate-700
                  font-medium
                  hover:bg-slate-100
                  transition-all
                  duration-300
                "
                onClick={() => navigate("/contact-me")}
              >
                Contact Me
              </button>
            </div>

            {/* Stats */}

            <div className="flex flex-wrap gap-8 mt-10 justify-center md:justify-start">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  3+
                </h3>
                <p className="text-slate-500 text-sm">
                  Projects
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  AI
                </h3>
                <p className="text-slate-500 text-sm">
                  Enthusiast
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Full Stack
                </h3>
                <p className="text-slate-500 text-sm">
                  Developer
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Education */}

      <Education />
    </div>
  );
};

export default Profile;