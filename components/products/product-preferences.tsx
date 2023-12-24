"use client";

import { getProduct } from "@/actions/user/products";
import { useProductsPreferences } from "@/hooks/useProductPreferences";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export type ProductPreferencesProps = {
  product : Prisma.ProductGetPayload<{ include: { tiers: { include: { tier: true } } } }> | null;
  onSubmit : ( product : Prisma.ProductGetPayload<{}> ) => void;
};

export default function ProductPreferences({ product, onSubmit } : ProductPreferencesProps) {

  const {
    increaseQuantity,
    decreaseQuantity,
    handleCommentsChange,
    quantity,
    comments,
    selectedTiers
  } = useProductsPreferences({ initialSelectedTiersIDS: [] });

  return (
    <div className="w-full flex flex-col">
      { !product && <span>Loading...</span> }
      {
        product?.tiers.map(
          tier => <span key={ tier.tierID }>{ tier.tier.name }</span>
        )
      }
    </div>
  );

};