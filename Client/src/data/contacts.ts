export interface Contact {
  id: string;
  title: string;
  value: string;
  link: string;
  icon: "whatsapp" | "email" | "linkedin" | "github" | "instagram";
  color: string;
}

// NOTE: email's `link` is overridden at render time in ContactMe.tsx
// depending on whether the visitor is on mobile or desktop — the value
// here is just a fallback.
export const contacts: Contact[] = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    value: "+91 8850208655",
    link: "https://wa.me/918850208655?text=Hi%20Zubaida,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.",
    icon: "whatsapp",
    color: "#25D366",
  },
  {
    id: "email",
    title: "Email",
    value: "samanizubaida48@gmail.com",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=samanizubaida48@gmail.com",
    icon: "email",
    color: "#00D4FF",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    value: "linkedin.com/in/zubaida-samani",
    link: "https://www.linkedin.com/in/zubaida-samani-b6591a386/",
    icon: "linkedin",
    color: "#0A66C2",
  },
  {
    id: "github",
    title: "GitHub",
    value: "github.com/Samani-zubaida",
    link: "https://github.com/Samani-zubaida",
    icon: "github",
    color: "#F5F5F5",
  },
  {
    id: "instagram",
    title: "Instagram",
    // TODO: replace with your real handle/link
    value: "_s.zubaida_",
    link: "https://www.instagram.com/_s.zubaida_/",
    icon: "instagram",
    color: "#E1306C",
  },
];