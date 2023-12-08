"use client";

import { faBars, faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import NavLink from "./nav-link";
import { DASHBOARD } from "@/config/config";
import Navbar from "./navbar";
import { useState } from "react";

export default function Header() {

  const [ open, setOpen ] = useState( false );

  return (
    <div className="flex flex-row bg-gray-100 p-4 ">
      {/* <div className="w-[130px] relative aspect-video">
        <Image
          src="/logo_dark_delivery.svg"
          fill
          alt=""
        />
      </div> */}
      <FontAwesomeIcon
        icon={ faBars }
        className="text-sm w-6 h-6 ml-auto hover:cursor-pointer"
        onClick={ setOpen.bind(null, true) }
      />
      <Navbar open={ open } onClose={ setOpen.bind( null, false ) } />
    </div>
  );

};