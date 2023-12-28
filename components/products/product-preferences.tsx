"use client";

import { GetProductsWithIngredientsResult } from "@/actions/user/products";
import { CartProduct } from "@/dexie/tables/cart_product";
import { useProductsPreferences } from "@/hooks/useProductPreferences";

export type ProductPreferencesProps = {
  productAndTiers : GetProductsWithIngredientsResult | null | undefined;
  onSubmit : ( product : Partial< CartProduct > ) => void;
};

export default function ProductPreferences({ productAndTiers, onSubmit } : ProductPreferencesProps) {

  const {
    increaseQuantity,
    decreaseQuantity,
    handleToggleIngredient,
    quantity,
    comments,
    ingredients,
    isSelected
  } = useProductsPreferences({
    initialDescription: '',
    initialIngredients: [],
    initialQuantity: 1,
  });

  const handleSubmit = () => {

    // onSubmit({ name: product.name, quantity, comments, tiers: selectedTiersIDS });

  };

  if ( !productAndTiers ) return <span>Loading...</span>;

  const { name, price, minQuantity, tiers } = productAndTiers;

  return (
    <div className="w-full flex flex-col gap-2">
      {
        tiers.map(
          tier => (
            <div className="flex flex-col w-full cursor-pointer">
              <span className="uppercase text-sm font-bold px-2">{ tier.name }</span>
              {
                tier.options.map(
                  option => (
                    <div className="flex p-2 flex-row w-full hover:bg-gray-100" onClick={() => { handleToggleIngredient( tier.id, option.id ) }}>
                      <input checked={ isSelected( tier.id, option.id ) } type="checkbox" className="w-5 h-5 my-auto accent-red-800" />
                      <span className="ml-2 my-auto">{ option.name }</span>
                    </div>
                  )
                )
              }
            </div>
          )
        )
      }
      <button onClick={handleSubmit}>submit</button>
    </div>
  );

};