import { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

// Navbar is no longer rendered here — it now lives ONCE at the App.tsx
// level, outside the route tree, so it never remounts or flickers
// between pages. This just adds top padding so content clears the
// persistent nav.
const PageShell = ({ children }: PageShellProps) => {
  return <div className="min-h-full pt-28">{children}</div>;
};

export default PageShell;