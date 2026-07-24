import PageShell from "../components/layouts/PageShell";
import PageTransition from "../components/layouts/PageTransition";
import Projects from "../components/projects/Projects";

const ProjectsPage = () => {
  return (
    <PageTransition>
      <PageShell>
        <Projects />
      </PageShell>
    </PageTransition>
  );
};

export default ProjectsPage;