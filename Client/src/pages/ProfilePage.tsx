import PageTransition from "../components/layouts/PageTransition";
import PageShell from "../components/layouts/PageShell";
import Profile from "../components/Profile";

const ProfilePage = () => {
  return (
    <PageTransition>
      <PageShell>
        <Profile />
      </PageShell>
    </PageTransition>
  );
};

export default ProfilePage;