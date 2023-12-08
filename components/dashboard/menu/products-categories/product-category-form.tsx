"use client";

import { Button } from "@/components/buttons";
import Input from "@/components/inputs/input";
import SelectInput from "@/components/inputs/select-input";
import { useFormState } from "react-dom";

export type ProductFormProps = {
  action : ( prevState: any, formData: FormData ) => Promise<any>;
};

export default function ProductCategoryForm({ action } : ProductFormProps) {

  const [ state, dispatch ] = useFormState( action, { message: null, errors: {} } );

  return (
    <form action={ dispatch } className="w-full flex flex-col gap-4">
      <Input 
        name="name"
        type="text"
        label="name"
        value=""
        placeholder="name"
      />
      <Button className="mt-2">create</Button>
    </form>
  );

};