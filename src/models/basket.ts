interface BasketItem {
  path: string;
  amount: number;
  name: string;
  image?: string | undefined;
  price: number;
}

interface Basket {
  items: Array<BasketItem>;
}

export default Basket;
export type { BasketItem };
