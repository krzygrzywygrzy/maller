interface BasketItem {
  path: string;
  amount: number;
}

interface Basket {
  items: Array<BasketItem>;
}

export default Basket;
export type { BasketItem };
