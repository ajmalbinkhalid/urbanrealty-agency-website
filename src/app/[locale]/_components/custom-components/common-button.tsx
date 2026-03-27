import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Props = {
  title: string;
  image: string;
};

const CommonButton = ({ title, image }: Props) => (
  <div>
    <Link
      className="flex h-fit gap-[10px] rounded-[6px] bg-linear-to-r w-fit from-[#006AFF] to-[#1311BF] px-[15px] clamp-[py,6px,12.5px] text-white"
      href={"/list-your-property"}
    >
      {image && <Image alt="img" src={image} />}
      {title}
    </Link>
  </div>
);

export default CommonButton;
