"use client";

import SubmitButton, { ActionButton, Button } from "@/components/buttons";
import Input from "@/components/inputs/input";
import { Prisma } from "@prisma/client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import FormResultMessage from "../../forms/form-result-message";
import { ActionFn, CreateProductCategoryFormState, FormStateStatus } from "@/types/actions";
import { Slide, ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export type ProductFormProps = {
  action : ActionFn< CreateProductCategoryFormState >;
  productCategory ?: Prisma.ProductCategoryGetPayload<{}>;
  submitText ?: string;
  loadingText ?: string;
};

export default function ProductCategoryForm({ action, productCategory, submitText = "create", loadingText } : ProductFormProps) {

  const [ state, dispatch ] = useFormState< CreateProductCategoryFormState, FormData >( 
    action, 
    { 
      message: undefined, 
      errors: null, 
      status: FormStateStatus.UNINITIALIZED 
    }
  );

  useEffect(() => {

    if ( state.status != FormStateStatus.UNINITIALIZED ) {

      if ( state.status === FormStateStatus.SUCCESS ) {
        
        toast.success( state.message, { 
          icon: <FontAwesomeIcon icon={ faCheckCircle } size="lg" className="text-green-500" /> 
        });

      }

      if ( state.status === FormStateStatus.ERROR ) {
        
        toast.error( state.message, { 
          icon: <FontAwesomeIcon icon={ faTimesCircle } size="lg" className="text-red-500" /> 
        });

      }

    }

  }, [ state ]);

  return (
    <form 
      action={ dispatch }
      className="w-full flex flex-col gap-4"
      >
        { productCategory && <input name="id" value={ productCategory.id } type="hidden" /> }
        <Input 
          name="name"
          type="text"
          label="name"
          value={ productCategory?.name ?? '' }
          placeholder="name"
          errors={ state?.errors?.fieldErrors?.name ?? [] }
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