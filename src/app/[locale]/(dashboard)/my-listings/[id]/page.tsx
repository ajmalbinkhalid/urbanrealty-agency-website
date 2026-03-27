import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import PropertyViewCard from "./_components/property-view-card";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: propertyId } = await params;
  return (
    <div>
      <div className="clamp-[mb,1.5rem,1.625rem] flex items-center justify-between">
        <h1 className="clamp-[text,1rem,1.5rem] font-jost font-medium text-[#1800AD]">
          My Listings
        </h1>

        <Link
          className="clamp-[text,.9375rem,1rem] flex items-center gap-2 text-[#1800AD] hover:underline"
          href="/my-listings"
        >
          <ArrowLeft className="size-4" /> Back to My listing
        </Link>
      </div>
      <div className="w-full rounded-[.375rem] bg-white shadow-[0px_10px_20px_0px_rgba(59,77,129,0.08)]">
        <PropertyViewCard propertyId={propertyId} />
      </div>
    </div>
  );
};

export default page;
