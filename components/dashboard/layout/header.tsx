import { faBars, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import NavLink from "./nav-link";
import { DASHBOARD } from "@/config/config";

export default function Header() {

  return (
    <div className="flex flex-row bg-gray-100 p-4 h-16">
      {/* <div className="w-[130px] relative aspect-video">
        <Image
          src="/logo_dark_delivery.svg"
          fill
          alt=""
        />
      </div> */}
      {/* <FontAwesomeIcon
        icon={ faBars }
        className="text-sm w-6 h-6 ml-auto"
      /> */}
    </div>
  );

};