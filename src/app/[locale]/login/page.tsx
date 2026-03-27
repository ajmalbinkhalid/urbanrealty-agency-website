import AuthImageSection from "../_components/auth-components/auth-image-section";
import LoginPage from "../_components/auth-components/login-page";

const page = () => (
  <div className="flex flex-row max-md:flex-col">
    <AuthImageSection />
    <LoginPage />
  </div>
);

export default page;
