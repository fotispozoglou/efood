"use client";

import SubmitButton, { Button } from "@/components/buttons";
import Input from "@/components/inputs/input";
import SelectInput from "@/components/inputs/select-input";
import { ActionFn, CreateProductFormState, FormStateStatus } from "@/types/actions";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export type ProductFormProps = {
  action : ActionFn< CreateProductFormState >;
  product ?: Prisma.ProductGetPayload<{}>;
  submitText ?: string;
  productsCategories : Prisma.ProductCategoryGetPayload<{}>[];
  loadingText : string;
};

export default function ProductForm({ action, productsCategories, product, loadingText, submitText = "create" } : ProductFormProps) {

  const [ state, dispatch ] = useFormState< CreateProductFormState, FormData >( 
    action, 
    { 
      message: "",
      status: FormStateStatus.UNINITIALIZED, 
      errors: null,
      product: null
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
    <form action={ dispatch } className="w-full flex flex-col gap-4">
      { product && <input name="id" type="hidden" value={ product.id } /> }
      <Input 
        name="name"
        type="text"
        label="name"
        value={ product?.name ?? '' }
        placeholder="name"
      />
      <Input 
        name="price"
        type="text"
        label="price"
        value={ product?.price.toString() ?? '' }
        placeholder="price"
      />
      <Input 
        name="description"
        type="text"
        label="description"
        value={ product?.description ?? '' }
        placeholder="description"
      />
      <SelectInput
        name="available"
        options={[{ name: "available", id: 'true' }, { name: "not available", id: 'false' }]}
        label="available"
        defaultValue={ product?.available === true ? { name: "available", id: 'true' } : { name: "not available", id: 'false' } }
        errors={[]}
        isMulti={false}
      />
      <Input 
        name="min_quantity"
        type="text"
        label="minimum quantity"
        value={ product?.minQuantity.toString() ?? '' }
        placeholder="minimum quantity"
      />
      <SelectInput
        name="categoryID"
        options={ productsCategories }
        label="category"
        errors={[]}
        isMulti={false}
      />
      <SubmitButton 
        className="transition-colors w-max p-2 px-6 bg-gray-700 hover:bg-gray-800 text-white rounded-md uppercase font-bold text-sm" 
        status={ state.status }
        loadingText={ loadingText }
        >
        { submitText }
      </SubmitButton>
      {/* <Button className="transition-colors w-max p-2 px-4 rounded-md uppercase font-bold text-sm">{ submitText }</Button> */}
    </form>
  );

};