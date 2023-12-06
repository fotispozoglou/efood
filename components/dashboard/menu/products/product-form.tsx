"use client";

import { Button } from "@/components/buttons";
import Input from "@/components/inputs/input";
import SelectInput from "@/components/inputs/select-input";
import { useFormState } from "react-dom";

export type ProductFormProps = {
  action : ( prevState: any, formData: FormData ) => Promise<any>;
};

export default function ProductForm({ action } : ProductFormProps) {

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
      <Input 
        name="price"
        type="text"
        label="price"
        value=""
        placeholder="price"
      />
      <Input 
        name="description"
        type="text"
        label="description"
        value=""
        placeholder="description"
      />
      <SelectInput
        name="available"
        options={[{ name: "available", id: 'true' }, { name: "not available", id: 'false' }]}
        label="available"
        errors={[]}
        isMulti={false}
      />
      <Input 
        name="min_quantity"
        type="text"
        label="minimum quantity"
        value=""
        placeholder="minimum quantity"
      />
      <SelectInput
        name="categoryID"
        options={[{ name: "category 1", id: '1' }, { name: "category 2", id: '2' }]}
        label="category"
        errors={[]}
        isMulti={false}
      />
      <Button className="mt-2">create</Button>
    </form>
  );

};