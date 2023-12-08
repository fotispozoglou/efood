"use client";

import { DASHBOARD } from "@/config/config";
import NavLink from "./nav-link";
import { faDrumstickBite, faLayerGroup, faList, faSeedling } from "@fortawesome/free-solid-svg-icons";
import NavGroup from "./nav-group";

export type NavbarProps = {
  open : boolean;
  onClose : () => void;
};

export default function Navbar({ open, onClose } : NavbarProps) {

  return (
    <div 
      className={`flex flex-col fixed w-screen h-screen top-0 left-0 z-10 bg-black/40 transition-[left] ${ open ? 'left-0' : '-left-full' }`} 
      onClick={ onClose }
      >
      <div className="bg-white w-max h-full overflow-scroll" onClick={e => e.stopPropagation()}>
        <NavGroup title="orders">
          <NavLink href={ DASHBOARD.ROUTES.PRODUCTS } icon={ faDrumstickBite }>products</NavLink>
          <NavLink href={ DASHBOARD.ROUTES.PRODUCTS_CATEGORIES } icon={ faLayerGroup }>products categories</NavLink>
          <NavLink href={ DASHBOARD.ROUTES.INGREDIENTS } icon={ faSeedling }>ingredients</NavLink>
          <NavLink href={ DASHBOARD.ROUTES.TIERS } icon={ faList }>tiers</NavLink>
        </NavGroup>
        <NavGroup title="menu">
          <NavLink href={ DASHBOARD.ROUTES.PRODUCTS } icon={ faDrumstickBite }>products</NavLink>
          <NavLink href={ DASHBOARD.ROUTES.PRODUCTS_CATEGORIES } icon={ faLayerGroup }>products categories</NavLink>
          <NavLink href={ DASHBOARD.ROUTES.INGREDIENTS } icon={ faSeedling }>ingredients</NavLink>
          <NavLink href={ DASHBOARD.ROUTES.TIERS } icon={ faList }>tiers</NavLink>
        </NavGroup>
      </div>
    </div>
  );

};