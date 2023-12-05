import { Prisma } from "@prisma/client";

export const PRODUCTS : Prisma.ProductGetPayload<{}>[] = [
  {
    id: '1',
    name: 'Souvlaki xoirino',
    price: new Prisma.Decimal( 1 ),
  },
  {
    id: '2',
    name: 'Souvlaki kotopoulo',
    price: new Prisma.Decimal( 1 ),
  },
  {
    id: '3',
    name: 'Gyros xoirinos',
    price: new Prisma.Decimal( 2.2 ),
  },
  {
    id: '4',
    name: 'Gyros kotopoulo',
    price: new Prisma.Decimal( 2.2 ),
  },
  {
    id: '5',
    name: 'Patates tiganites',
    price: new Prisma.Decimal( 1 ),
  },
  {
    id: '6',
    name: 'Club Gyros',
    price: new Prisma.Decimal( 5 ),
  },
  {
    id: '7',
    name: 'Club sandwich',
    price: new Prisma.Decimal( 4.5 ),
  },
  {
    id: '8',
    name: 'Souvlaki provio',
    price: new Prisma.Decimal( 1.9 ),
  },
  {
    id: '9',
    name: 'Gyros sandwich',
    price: new Prisma.Decimal( 3.2 ),
  },
  {
    id: '10',
    name: 'Kempap',
    price: new Prisma.Decimal( 1.7 ),
  },
  {
    id: '11',
    name: 'Gyros xoirinos merida',
    price: new Prisma.Decimal( 6.9 ),
  },
  {
    id: '12',
    name: 'Gyros kotopoulo merida',
    price: new Prisma.Decimal( 6.9 ),
  },
  {
    id: '13',
    name: 'Coca-cola 330ml',
    price: new Prisma.Decimal( 1.2 ),
  },
  {
    id: '14',
    name: 'Coca-cola zero 330ml',
    price: new Prisma.Decimal( 1.2 ),
  },
  {
    id: '15',
    name: 'Sprite 330ml',
    price: new Prisma.Decimal( 1.2 ),
  },
  {
    id: '16',
    name: 'Ketchup sauce',
    price: new Prisma.Decimal( 2.5 ),
  },
  {
    id: '17',
    name: 'Mustard sauce',
    price: new Prisma.Decimal( 2.5 ),
  },
  {
    id: '18',
    name: 'Tzatziki sauce',
    price: new Prisma.Decimal( 2.5 ),
  },
  {
    id: '19',
    name: 'BBQ Sauce',
    price: new Prisma.Decimal( 2.5 ),
  },
  {
    id: '20',
    name: 'Feta',
    price: new Prisma.Decimal( 2.5 ),
  },
];