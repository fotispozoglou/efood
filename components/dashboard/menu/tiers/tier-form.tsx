"use client";

import SubmitButton, { Button } from "@/components/buttons";
import Input from "@/components/inputs/input";
import useToast from "@/hooks/useToast";
import { ActionFn, CreateTierFormState, FormStateStatus } from "@/types/actions";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export type TierFormProps = {
  action : ActionFn< CreateTierFormState >;
  tier ?: Prisma.TierGetPayload<{}>;
  submitText ?: string;
  loadingText : string;
};

export default function TierForm({ action, tier, loadingText, submitText = "create" } : TierFormProps) {

  const [ state, dispatch ] = useFormState< CreateTierFormState, FormData >( 
    action, 
    { 
      message: "",
      status: FormStateStatus.UNINITIALIZED, 
      errors: null,
      tier: null
    } 
  );

  useToast({ state });

  return (
    <form action={ dispatch } className="w-full flex flex-col gap-4">
      { tier && <input name="id" type="hidden" value={ tier.id } /> }
      <Input 
        name="name"
        type="text"
        label="name"
        value={ tier?.name ?? '' }
        placeholder="name"
      />
      <Input 
        name="maximum_selections"
        type="text"
        label="maximum selection"
        value={ String(tier?.maximumSelections) ?? '' }
        placeholder="maximum selection"
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