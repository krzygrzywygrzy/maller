import Comment from "./comment";

interface Product {
  name: string;
  description?: string;
  price: number;
  inStock?: number;
  image?: string; // base64 string image
  objectID?: string;
  comments?: Array<Comment>;
  category?: string;
  subcategory?: string;
}

export default Product;
