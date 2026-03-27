import AuthImageSection from "../_components/auth-components/auth-image-section";
import RegisterPage from "../_components/auth-components/register-page";

const page = () => (
  <div className="flex flex-row max-md:flex-col">
    <AuthImageSection />
    <RegisterPage />
  </div>
);

export default page;
