import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ListYourProperty from "./_components/property-add-form";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id: propertyId } = await searchParams;
  return (
    <div>
      <div className="clamp-[mb,1.5rem,1.625rem] flex items-center justify-between">
        <h1 className="clamp-[text,1rem,1.5rem] font-jost font-medium text-[#1800AD]">
          {" "}
          {(await searchParams).id
            ? "Edit your property"
            : " List your property"}
        </h1>

        <Link
          className="clamp-[text,.9375rem,1rem] flex items-center gap-2 text-[#1800AD] hover:underline"
          href="/my-listings"
        >
          <ArrowLeft className="size-4" /> Back to My listing
        </Link>
      </div>
      <div className="w-full rounded-[.375rem] bg-white shadow-[0px_10px_20px_0px_rgba(59,77,129,0.08)]">
        <div className="mx-auto max-w-250 px-4 py-6 md:px-10 md:py-10">
          <ListYourProperty propertyId={propertyId} />
        </div>
      </div>
    </div>
  );
};

export default page;
