//TODO: finish product interface

interface Product {
  name: string;
  description?: string;
  price: Number;
  inStock: Number;
  image?: string; // base64 string image
}

export default Product;
