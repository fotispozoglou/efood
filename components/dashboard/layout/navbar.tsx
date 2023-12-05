"use client";

import { DASHBOARD } from "@/config/config";
import NavLink from "./nav-link";
import { faDrumstickBite, faLayerGroup, faList, faSeedling } from "@fortawesome/free-solid-svg-icons";
import NavGroup from "./nav-group";

export default function Navbar() {

  return (
    <div className="flex flex-col fixed w-screen h-screen top-0 left-0">
      <div className="bg-white w-max h-full overflow-scroll">
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