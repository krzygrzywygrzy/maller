//TODO: finish product interface

interface Product {
  name: string;
  description?: string;
  price: number;
  inStock?: number;
  image?: string; // base64 string image
  docId?: string;
  rating?: number;
}

export default Product;
