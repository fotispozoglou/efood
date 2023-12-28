import { GetProductsWithIngredientsResult } from "@/actions/user/products";
import { localDatabase } from "@/dexie/database";
import { Product } from "@/types/products";
import { Prisma } from "@prisma/client";
import { IndexableType } from "dexie";
import React from "react";
import uuid from 'uuid';

export type AddProductFn = (
  product : GetProductsWithIngredientsResult,
  comments : string,
  quantity : number,
  tiers : string[]
) => Promise<{ addedProduct : IndexableType }>;

export type UpdateProductFn = (
  id : string,
  comments : string,
  quantity : number,
  tiers : string[]
) => Promise<{ updatedProduct : number }>;

export type IncreaseQuantityFn = ( id : string, amount : number ) => Promise< any >;
export type DecreaseQuantityFn = ( id : string, amount : number ) => Promise< any >;

export type CartContextType = {
  addProduct : AddProductFn;
  updateProduct : UpdateProductFn;
  increaseQuantity : IncreaseQuantityFn;
  decreaseQuantity : DecreaseQuantityFn;
  selectedProduct : GetProductsWithIngredientsResult | null;
  setSelectedProductID: ( id : string ) => void;
  productPreferencesOpen : boolean;
  setProductPreferencesOpen : ( open : boolean ) => void;
};

export const addProduct : AddProductFn = async ( product, comments, quantity, tiers ) => {

  const id = uuid.v4();

  const addedProduct = await localDatabase.cartProducts.add({
    id,
    originalID: product.id,
    name: product.name,
    comments,
    quantity,
    ingredients: tiers
  });

  return { addedProduct };

};

export const updateProduct : UpdateProductFn = async ( id, comments, quantity, tiers ) => {

  const updatedProduct = await localDatabase.cartProducts.update( id, {
    comments,
    quantity,
    tiers
  });

  return { updatedProduct };

};

export const increaseProductQuantity = async ( id : string, amount : number = 1 ) => {

  const product = await localDatabase.cartProducts.where({ id }).first();

  if ( !product ) return null;

  await localDatabase.cartProducts.update(id, { quantity: product.quantity + amount });

};

export const decreaseProductQuantity = async ( id : string, amount : number = 1 ) => {

  const product = await localDatabase.cartProducts.where({ id }).first();

  if ( !product ) return null;

  await localDatabase.cartProducts.update(id, { quantity: product.quantity - amount });

};

export const CartContext = React.createContext< CartContextType >({
  addProduct,
  updateProduct,
  increaseQuantity: increaseProductQuantity,
  decreaseQuantity: decreaseProductQuantity,
  selectedProduct: null,
  setSelectedProductID: ( id ) => {},
  productPreferencesOpen: false,
  setProductPreferencesOpen: ( open ) => {}
});