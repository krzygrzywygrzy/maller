import Basket from "./basket";

interface Order {
    basket: Basket,
    paymentStatus: string,
}

export default Order;