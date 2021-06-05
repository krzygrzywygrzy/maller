import Comment from "./comment";

interface Product {
  name: string;
  description?: string;
  price: number;
  inStock?: number;
  image?: string; // base64 string image
  docId?: string;
  comments?: Array<Comment>;
  path?: string;
  category?: string;
  subcategory?: string;
}

export default Product;
