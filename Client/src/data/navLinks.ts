export interface NavLink {
  label: string;
  href: string;
}

// Real routes now — no more "/#hero" hash hacks. Clicking these is a
// genuine in-app navigation, so ChatSidebar uses React Router's Link
// for all of them.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/profile" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];