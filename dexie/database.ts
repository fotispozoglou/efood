import Dexie, { Table } from 'dexie';
import { config } from './config';
import { CartProduct } from './tables/cart_product';

export class EfoodDexie extends Dexie {
  cartProducts!: Table<CartProduct>;

  constructor() {
    super( config.name );

    // Indexes 'id, name, ...' are only used for querying 
    // Not the schema of the table
    this.version( config.version ).stores({
      cartProducts: 'id, originalID, name'
    });
  
  };

};

export const localDatabase = new EfoodDexie();