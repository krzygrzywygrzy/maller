import Comment from "./comment";

interface Product {
  name: string;
  description?: string;
  price: number;
  inStock?: number;
  image?: string; // base64 string image
  docId?: string;
  rating?: number;
  comments?: Array<Comment>;
  path?: string;
}

export default Product;
