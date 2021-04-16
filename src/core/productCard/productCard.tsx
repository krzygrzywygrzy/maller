import React from "react";
import Product from "../../interfaces/product";
import "./productCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-img"></div>
      <div className="product-info">
        <div className="product-title">{product.name}</div>
        <div>{product.price}$</div>
      </div>
    </div>
  );
};

export default ProductCard;
