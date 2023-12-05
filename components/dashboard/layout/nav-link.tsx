"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export type NavLinkProps = {
  children : React.ReactNode;
  href : string;
  icon : IconProp;
};

export default function NavLink( props : NavLinkProps ) {

  return (
    <Link href={ props.href } className="flex flex-row pl-3 text-slate-700 hover:text-slate-950 transition-colors">
      <FontAwesomeIcon
        icon={ props.icon }
        className="!w-[1.5em] !h-[1.5em] my-auto"
      />
      <div className="p-3 text-slate-700 pr-6">
      { props.children }
      </div>
    </Link>
  );

};