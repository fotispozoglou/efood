import { getIngredients } from "@/actions/user/ingredients";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type PrismaIngredient = Prisma.IngredientGetPayload<{}>;

const populateIngredients = ( allIngredients : PrismaIngredient[], selectedIngredients : string[] ) => {

  return allIngredients.filter( i => selectedIngredients.includes( i.id ) );

};

export type UseProductPreferencesParams = {
  initialQuantity : number;
  initialIngredients : string[];
  initialDescription : string;
};

export const useProductsPreferences = ({
  initialQuantity,
  initialIngredients,
  initialDescription,
} : UseProductPreferencesParams ) => {

  const [ ingredients, setIngredients ] = useState( initialIngredients );
  const [ quantity, setQuantity ] = useState( initialQuantity );
  const [ comments, setComments ] = useState( initialDescription );

  const handleToggleIngredient = ( tierID : string, ingredientID : string ) => {

    const key = `${ tierID }.${ ingredientID }`;

    setIngredients( ingredients => {

      const selected = isSelected( tierID, ingredientID );

      const selectedTierIngredients = ingredients.filter(i => i.startsWith( tierID ));

      if ( selectedTierIngredients.length >= 1 ) {

        return [ ...ingredients ];

      }

      return [ ...ingredients, key ];

    });

  };

  const isSelected = ( tierID : string, ingredientID : string ) => {

    const key = `${ tierID }.${ ingredientID }`;

    return ingredients.find(i => i === key) != null;

  };

  const increaseQuantity = ( amount : number = 1 ) => {

    setQuantity( q => q + amount );

  };

  const decreaseQuantity = ( amount : number = 1 ) => {

    setQuantity( q => q - amount );

  };

  const onCommentsChange = ( e : React.ChangeEvent< HTMLTextAreaElement | HTMLInputElement > ) => {

    setComments( e.target.value );

  };

  return {
    ingredients,
    quantity,
    comments,
    isSelected,
    handleToggleIngredient,
    increaseQuantity,
    decreaseQuantity,
    onCommentsChange
  };

};