import PageTransition from "../components/layouts/PageTransition";
import PageShell from "../components/layouts/PageShell";
import ContactMe from "../components/contact/ContactMe";

const ContactPage = () => {
  return (
    <PageTransition>
      <PageShell>
        <ContactMe />
      </PageShell>
    </PageTransition>
  );
};

export default ContactPage;