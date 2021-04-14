import React from "react";
import Product from "../../interfaces/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  return <div className="product-card">card</div>;
};

export default ProductCard;
