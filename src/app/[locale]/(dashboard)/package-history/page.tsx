import PackageHistory from "./_components/package-history";

const page = () => (
  <div>
    <div className="clamp-[mb,1.5rem,1.625rem] flex items-center justify-between">
      <h1 className="clamp-[text,1rem,1.5rem] font-jost font-medium text-[#1800AD]">
        Package history
      </h1>
    </div>
    <div className="w-full rounded-[.375rem] bg-white shadow-[0px_10px_20px_0px_rgba(59,77,129,0.08)]">
      <PackageHistory />
    </div>
  </div>
);

export default page;
