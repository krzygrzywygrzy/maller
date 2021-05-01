import React from "react";
import Product from "../../models/product";
import "./productCard.css";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  return (
    <div className="product-card">
      <Link href={`/item/${product.docId}`}>
        <div className="product-img"></div>
        <div className="product-info">
          <div className="product-title">{product.name}</div>
          <div>{product.price}$</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
