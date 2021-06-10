import React from "react";
import Product from "../../models/product";
import "./productCard.css";
import { Link } from "wouter";
import useGetImageUrl from "../../services/useGetImageUrl";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  const img = useGetImageUrl(product.image);
  return (
    <div className="product-card">
      <Link href={`/item/${product.objectID}`}>
        <div className="product-img">
          {product.image && img !== "" ? (
            <img alt={product.name} src={img} />
          ) : (
            <div className="no-product-img">
              <div>no image</div>
            </div>
          )}
        </div>
        <div className="product-info">
          <div className="product-title">{product.name}</div>
          <div>{product.price}$</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
