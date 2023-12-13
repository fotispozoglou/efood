import { CreateIngredientSchemaType, UpdateIngredientSchemaType } from "@/models/ingredients";
import { CreateProductSchemaType, UpdateProductSchemaType } from "@/models/products";
import { CreateProductCategorySchemaType, UpdateProductCategorySchemaType } from "@/models/products-categories";
import { Prisma } from "@prisma/client";
import { typeToFlattenedError } from "zod";

export enum FormStateStatus {
  UNINITIALIZED,
  SUCCESS,
  ERROR
};

export type BaseFormState< SchemaType > = {
  message ?: string;
  errors : typeToFlattenedError< SchemaType > | null;
  status : FormStateStatus;
};

export type ActionFn< FormStateType > = ( prevState: FormStateType, formData: FormData ) => FormStateType | Promise<FormStateType>;

export type CreateProductCategoryFormState = BaseFormState< CreateProductCategorySchemaType > & { productCategory ?: Prisma.ProductCategoryGetPayload<{}> | null };
export type UpdateProductCategoryFormState = BaseFormState< UpdateProductCategorySchemaType > & { productCategory ?: Prisma.ProductCategoryGetPayload<{}> | null };

export type CreateProductFormState = BaseFormState< CreateProductSchemaType > & { product ?: Prisma.ProductGetPayload<{}> | null };
export type UpdateProductFormState = BaseFormState< UpdateProductSchemaType > & { product ?: Prisma.ProductGetPayload<{}> | null };

export type CreateIngredientFormState = BaseFormState< CreateIngredientSchemaType > & { ingredient ?: Prisma.IngredientGetPayload<{}> | null };
export type UpdateIngredientFormState = BaseFormState< UpdateIngredientSchemaType > & { ingredient ?: Prisma.IngredientGetPayload<{}> | null };

export type CreateTierFormState = BaseFormState< CreateIngredientSchemaType > & { tier ?: Prisma.TierGetPayload<{}> | null };
export type UpdateTierFormState = BaseFormState< UpdateIngredientSchemaType > & { tier ?: Prisma.TierGetPayload<{}> | null };