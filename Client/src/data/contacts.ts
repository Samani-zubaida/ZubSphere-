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
];