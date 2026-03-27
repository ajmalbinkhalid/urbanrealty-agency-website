import EmailUpdateForm from "./_components/email-update-form";
import PhoneUpdateForm from "./_components/phone-update-form";
import ProfileForm from "./_components/profile-form";

const page = () => (
  <div>
    <div className="clamp-[mb,1.5rem,1.625rem] flex items-center justify-between">
      <h1 className="clamp-[text,1rem,1.5rem] font-jost font-medium text-[#1800AD]">
        Edit profile
      </h1>
    </div>
    <div className="w-full rounded-[.375rem] bg-white shadow-[0px_10px_20px_0px_rgba(59,77,129,0.08)]">
      <div className="mx-auto max-w-250 px-4 py-6 md:px-10 md:py-10">
        <ProfileForm />

        <div className="clamp-[mb,2rem,2.625rem] h-px w-full bg-[#000000]" />

        <div className="clamp-[mb,2rem,2.625rem]">
          <EmailUpdateForm />
        </div>

        <div className="clamp-[mb,2rem,2.625rem] h-px w-full bg-[#000000]" />

        <div className="clamp-[mb,2rem,2.625rem]">
          <PhoneUpdateForm />
        </div>
      </div>
    </div>
  </div>
);

export default page;
