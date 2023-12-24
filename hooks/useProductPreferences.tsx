import { getProduct } from "@/actions/user/products";
import { getProductsCategories } from "@/actions/user/products-categories";
import { getTiers } from "@/actions/user/tiers";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export type UseProductPreferencesParams = {
  initialSelectedTiersIDS : string[];
};

export const useProductsPreferences = ({  
  initialSelectedTiersIDS
} : UseProductPreferencesParams ) => {

  const { data } = useQuery({
    queryFn: getTiers,
    queryKey: ['tiers'],
  });

  const initialSelectedTiers = data?.tiers.filter(t => initialSelectedTiersIDS.includes(t.id));

  const [ selectedTiers, setSelectedTiers ] = useState< Prisma.TierGetPayload<{}>[] >( initialSelectedTiers ?? [] );
  const [ quantity, setQuantity ] = useState( 1 );
  const [ comments, setComments ] = useState( "" );

  const toggleTier = ( tierID : string ) => {

    const tierIndex = selectedTiers.findIndex(st => st.id === tierID);

    if ( tierIndex === -1 ) {

      setSelectedTiers( st => [ ...st, /* NewTier */ ] );

      return;

    }

    setSelectedTiers( st => st.filter(t => t.id === tierID) );

  };

  const increaseQuantity = () => {

    setQuantity( q => q + 1 );

  };

  const decreaseQuantity = () => {

    setQuantity( q => ( q - 1 ) < 1 ? q : q - 1 );

  };

  const handleCommentsChange = ( event : React.ChangeEvent< HTMLTextAreaElement | HTMLInputElement > ) => {

    setComments( event.target.value );

  };

  return {
    selectedTiers,
    quantity,
    comments,
    increaseQuantity,
    decreaseQuantity,
    toggleTier,
    handleCommentsChange
  };

};