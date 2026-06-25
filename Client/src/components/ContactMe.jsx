import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";

const ContactMe = () => {
  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const emailLink = isMobile
    ? "mailto:samanizubaida48@gmail.com"
    : "https://mail.google.com/mail/?view=cm&fs=1&to=samanizubaida48@gmail.com";

  const contacts = [
    {
      icon: <FiPhone size={24} />,
      title: "WhatsApp",
      value: "+91 8850208655",
      link:
        "https://wa.me/918850208655?text=Hi%20Zubaida,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <FiMail size={24} />,
      title: "Email",
      value: "samanizubaida48@gmail.com",
      link: emailLink,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiLinkedin size={24} />,
      title: "LinkedIn",
      value: "linkedin.com/in/zubaida-samani",
      link:
        "https://www.linkedin.com/in/zubaida-samani-b6591a386/",
      color: "from-blue-600 to-cyan-500",
    },
    {
      icon: <FiGithub size={24} />,
      title: "GitHub",
      value: "github.com/Samani-zubaida",
      link: "https://github.com/Samani-zubaida",
      color: "from-slate-700 to-slate-900",
    },
  ];

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden bg-slate-50">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-200/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/30 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
            Contact Information
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-800">
            Let's Connect
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Feel free to reach out regarding internships,
            collaborations, projects, or technology discussions.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contacts.map((item, index) => {
            const isExternal = item.link.startsWith("http");

            return (
              <motion.a
                key={index}
                href={item.link}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="
                  group
                  bg-white/80
                  backdrop-blur-xl
                  border
                  border-slate-200
                  rounded-3xl
                  p-6
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >
                <div
                  className={`
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-r
                    ${item.color}
                    text-white
                    flex
                    items-center
                    justify-center
                    mb-5
                  `}
                >
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-600 break-all">
                  {item.value}
                </p>

                <div className="mt-4 text-cyan-600 font-medium group-hover:translate-x-1 transition-transform">
                  Connect →
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="
            mt-12
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            text-center
            shadow-lg
          "
        >
          <h3 className="text-2xl font-bold text-slate-800">
            Open to Opportunities
          </h3>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Currently exploring internship opportunities in
            Full Stack Development, Software Engineering,
            Artificial Intelligence, and Machine Learning.
          </p>

          <a
            href={emailLink}
            target={!isMobile ? "_blank" : undefined}
            rel={!isMobile ? "noopener noreferrer" : undefined}
            className="
              inline-block
              mt-6
              px-8
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              font-medium
              hover:scale-105
              transition-all
            "
          >
            Send Email
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;