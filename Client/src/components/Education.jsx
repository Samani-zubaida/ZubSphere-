import { motion } from "framer-motion";

const Education = () => {
  const skills = [
    "C Programming",
    "Python",
    "HTML",
    "CSS",
    "JavaScript",
    "DBMS",
    "Problem Solving",
  ];

  return (
    <section className="relative py-20 px-5 md:px-10 overflow-hidden bg-slate-50">

      {/* BACKGROUND EFFECTS */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/40 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/40 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-14">

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Education
          </h1>

          <p className="text-slate-600 mt-4 text-base">
            Building a strong technical foundation through academics,
            programming, and continuous learning.
          </p>

        </div>

        {/* SSC CARD */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            mb-8
            bg-white
            border border-slate-200
            rounded-[28px]
            p-6 md:p-8
            shadow-[0_20px_50px_rgba(15,23,42,0.08)]
            hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]
            transition-all duration-300
          "
        >

          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* ICON */}

            <div
              className="
                w-20 h-20
                rounded-2xl
                bg-gradient-to-br
                from-cyan-100
                to-sky-100
                border border-cyan-200
                flex items-center justify-center
                shrink-0
              "
            >

              <img
                src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                alt="school"
                className="w-10"
              />

            </div>

            {/* CONTENT */}

            <div className="flex-1 text-center md:text-left">

              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                SSC – Anjuman-I-Islam Allana English High School
              </h2>

              <p className="text-slate-500 mt-2">
                📍 Mumbai, Maharashtra
              </p>

              <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">

                <div
                  className="
                    bg-slate-50
                    border border-slate-200
                    px-5 py-4
                    rounded-xl
                    min-w-[150px]
                  "
                >

                  <p className="text-slate-500 text-sm">
                    Year of Passing
                  </p>

                  <p className="text-slate-900 font-semibold mt-1">
                    2024
                  </p>

                </div>

                <div
                  className="
                    bg-slate-50
                    border border-slate-200
                    px-5 py-4
                    rounded-xl
                    min-w-[180px]
                  "
                >

                  <p className="text-slate-500 text-sm">
                    Board
                  </p>

                  <p className="text-slate-900 font-semibold mt-1">
                    Maharashtra State Board
                  </p>

                </div>

              </div>

            </div>

            {/* PERCENTAGE */}

            <div
              className="
                w-24 h-24
                rounded-full
                border-[6px]
                border-cyan-500
                bg-cyan-50
                flex items-center justify-center
                text-cyan-600
                font-bold
                text-xl
                shrink-0
              "
            >

              %

            </div>

          </div>

        </motion.div>

        {/* DIPLOMA CARD */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
            bg-white
            border border-slate-200
            rounded-[28px]
            p-6 md:p-8
            shadow-[0_20px_50px_rgba(15,23,42,0.08)]
            hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]
            transition-all duration-300
          "
        >

          <div className="flex flex-col lg:flex-row items-center gap-8">

            {/* ICON */}

            <div
              className="
                w-20 h-20
                rounded-2xl
                bg-gradient-to-br
                from-cyan-100
                to-sky-100
                border border-cyan-200
                flex items-center justify-center
                shrink-0
              "
            >

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png"
                alt="college"
                className="w-10"
              />

            </div>

            {/* CONTENT */}

            <div className="flex-1 text-center lg:text-left">

              <h2 className="text-2xl font-bold text-slate-900">
                Diploma in Computer Engineering
              </h2>

              <h3 className="text-lg text-slate-600 mt-1">
                Government Polytechnic Mumbai
              </h3>

              <p className="text-slate-500 mt-2">
                📍 Mumbai, Maharashtra
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                <div
                  className="
                    bg-slate-50
                    border border-slate-200
                    p-4
                    rounded-xl
                  "
                >

                  <p className="text-slate-500 text-sm">
                    Duration
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    2023 – 2026
                  </p>

                </div>

                <div
                  className="
                    bg-slate-50
                    border border-slate-200
                    p-4
                    rounded-xl
                  "
                >

                  <p className="text-slate-500 text-sm">
                    Affiliated To
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    MSBTE
                  </p>

                </div>

                <div
                  className="
                    bg-slate-50
                    border border-slate-200
                    p-4
                    rounded-xl
                  "
                >

                  <p className="text-slate-500 text-sm">
                    Focus
                  </p>

                  <p className="font-semibold text-slate-900 mt-1">
                    Programming & Web Development
                  </p>

                </div>

              </div>

            </div>

            {/* IMAGE */}

            <div className="hidden lg:flex justify-center">

              <img
                src="https://cdn-icons-png.flaticon.com/512/2721/2721297.png"
                alt="developer"
                className="w-32"
              />

            </div>

          </div>

        </motion.div>

        {/* SKILLS */}

        <div className="mt-16 text-center">

          <h3 className="text-3xl font-bold text-slate-900 mb-8">
            Skills Learned
          </h3>

          <div className="flex flex-wrap justify-center gap-4">

            {skills.map((skill) => (

              <span
                key={skill}
                className="
                  px-5 py-2.5
                  rounded-full
                  bg-white
                  border border-slate-200
                  text-slate-700
                  text-sm
                  font-medium
                  shadow-sm
                  hover:shadow-md
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >

                {skill}

              </span>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Education;