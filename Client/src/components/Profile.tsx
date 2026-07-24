import { motion } from "framer-motion";
import { skills } from "../data/skills";
import { education } from "../data/education";
import SkillsFan from "../components/common/SkillsFan";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Profile = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {/* ================= MOBILE / TABLET (stacked flow, < lg) ================= */}
      <div className="lg:hidden min-h-screen w-full flex flex-col justify-center gap-10 sm:gap-12 px-5 xs:px-6 sm:px-10 py-20 sm:py-24">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center sm:text-left"
        >
          <h2
            style={{ fontFamily: "'General Sans', sans-serif" }}
            className="text-[clamp(2.75rem,10vw,4rem)] font-black text-[#00D4FF] leading-[1.05] tracking-tight"
          >
            Hey!
          </h2>
          <h3 className="text-[clamp(1.5rem,6vw,2.25rem)] font-black text-white/40 leading-[1.05] tracking-tight">
            I,m Samani Zubaida
          </h3>
        </motion.div>


        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-white/70 text-[clamp(1.05rem,3.4vw,1.2rem)] leading-relaxed text-center sm:text-left max-w-md mx-auto sm:mx-0"
        >
          I'm a Computer Engineering student with a strong foundation in
          Data Structures & Algorithms, Operating System, Rest API's, DBMS, CN, OOP. Skilled in
          Machine Learning, AI fundamentals, and full-stack development.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-md mx-auto sm:mx-0 w-full"
        >
          <h3 className="text-[clamp(1.1rem,4vw,1.5rem)] font-bold text-[#00D4FF] mb-3 text-center sm:text-left">
            Education
          </h3>
          {education.map((entry) => (
            <div
              key={entry.title}
              className="relative pl-5 pb-5 last:pb-0 border-l border-white/10 last:border-transparent text-left"
            >
              <span
                className="absolute -left-[4.5px] top-1 w-[9px] h-[9px] rounded-full"
                style={{
                  background: "#00D4FF",
                  boxShadow: "0 0 0 3px rgba(0,212,255,0.12)",
                }}
              /> 
              <span className="inline-block text-[#00D4FF]/70 text-[clamp(0.7rem,2.5vw,0.8rem)] font-mono tracking-wide uppercase mb-1">
                {entry.period}
              </span>
              <p className="text-white/85 text-[clamp(0.9rem,3vw,1.05rem)] font-medium leading-snug">
                {entry.title}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center sm:text-left"
        >
          <div className="w-full flex justify-center sm:justify-start">
            <SkillsFan items={skills} />
          </div>
        </motion.div>
      </div>

      {/* ================= DESKTOP (corner-pinned, lg+) ================= */}
      <div className="hidden lg:block relative min-h-screen w-full">

        {/* Top-left — big heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute top-16 xl:top-20 left-10 xl:left-16 max-w-md z-10"
        >
          <h2
            style={{ fontFamily: "'General Sans', sans-serif" }}
            className="text-[clamp(3rem,5vw,4.5rem)] font-black text-[#00D4FF] leading-[1.05] tracking-tight"
          >
            Hey!
          </h2>
          <h3 className="text-[clamp(2rem,3.5vw,3rem)] font-black text-white/40 leading-[1.05] tracking-tight">
            I'm Samani Zubaida
          </h3>
        </motion.div>

        {/* Left-mid — bio paragraph (BIGGER) */}
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="absolute top-1/2 -translate-y-1/2 left-10 xl:left-16 max-w-[260px] xl:max-w-[320px] text-white/60 text-[clamp(0.95rem,1.15vw,1.1rem)] leading-relaxed z-10"
        >
          I'm a Computer Engineering student with a strong foundation in
          Data Structures & Algorithms, Operating System, Rest API's, DBMS, CN, OOP. Skilled in
          Machine Learning, AI fundamentals, and full-stack development.
        </motion.p>

        {/* Right-mid — quick facts */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="absolute top-1/2 -translate-y-1/2 right-10 xl:right-16 max-w-[200px] xl:max-w-[240px] text-right z-10"
        >
          <p className="text-white/60 text-[clamp(0.8rem,1vw,0.9rem)] leading-relaxed">
            Machine Learning & AI fundamentals
          </p>
          <p className="text-white/60 text-[clamp(0.8rem,1vw,0.9rem)] leading-relaxed mt-1">
            Full-stack development
          </p>
        </motion.div>

        {/* Center — Portrait (KEEP EXACTLY AS YOUR CODE) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
         
        </motion.div>

        {/* Bottom-left — Education (VERTICAL TIMELINE) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="absolute bottom-14 xl:bottom-20 left-10 xl:left-16 max-w-sm z-10"
        >
          <h3 className="text-[clamp(1rem,1.4vw,1.25rem)] font-bold text-[#00D4FF] mb-4">
            Education
          </h3>
          <div className="relative">
            {education.map((entry) => (
              <div
                key={entry.title}
                className="relative pl-5 pb-6 last:pb-0 border-l border-white/10 last:border-transparent text-left"
              >
                <span
                  className="absolute -left-[4.5px] top-1 w-[9px] h-[9px] rounded-full"
                  style={{
                    background: "#00D4FF",
                    boxShadow: "0 0 0 3px rgba(0,212,255,0.12)",
                  }}
                />
                <span className="block text-[#00D4FF]/70 text-[clamp(0.65rem,0.85vw,0.8rem)] font-mono tracking-wide uppercase mb-1">
                  {entry.period}
                </span>
                <p className="text-white/85 text-[clamp(0.8rem,1vw,0.95rem)] font-medium leading-snug">
                  {entry.title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom-right — Skills (RIGHT ALIGNED, no flex wrapper pulling left) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="absolute bottom-14 xl:bottom-20 right-10 xl:right-16 z-10"
        >
          <SkillsFan items={skills} />
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;