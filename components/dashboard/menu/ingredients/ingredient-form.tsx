"use client";

import SubmitButton, { Button } from "@/components/buttons";
import Input from "@/components/inputs/input";
import useToast from "@/hooks/useToast";
import { ActionFn, CreateIngredientFormState, FormStateStatus } from "@/types/actions";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export type IngredientFormProps = {
  action : ActionFn< CreateIngredientFormState >;
  ingredient ?: Prisma.IngredientGetPayload<{}>;
  submitText ?: string;
  tiers : Prisma.TierGetPayload<{}>[];
  loadingText : string;
};

export default function IngredientForm({ action, tiers, ingredient, loadingText, submitText = "create" } : IngredientFormProps) {

  const [ state, dispatch ] = useFormState< CreateIngredientFormState, FormData >( 
    action, 
    { 
      message: "",
      status: FormStateStatus.UNINITIALIZED, 
      errors: null,
      ingredient: null
    } 
  );

  useToast({ state });

  return (
    <form action={ dispatch } className="w-full flex flex-col gap-4">
      { ingredient && <input name="id" type="hidden" value={ ingredient.id } /> }
      <Input 
        name="name"
        type="text"
        label="name"
        value={ ingredient?.name ?? '' }
        placeholder="name"
      />
      <Input 
        name="price"
        type="text"
        label="price"
        value={ ingredient?.price.toString() ?? '' }
        placeholder="price"
      />
      <SubmitButton 
        className="transition-colors w-max p-2 px-6 bg-gray-700 hover:bg-gray-800 text-white rounded-md uppercase font-bold text-sm" 
        status={ state.status }
        loadingText={ loadingText }
        >
        { submitText }
      </SubmitButton>
    </form>
  );

};