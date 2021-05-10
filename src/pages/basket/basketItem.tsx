import React from "react";
import { connect } from "react-redux";
import Product from "../../models/product";
import useGetImageUrl from "../../services/useGetImageUrl";
import { basketRemoveAction } from "../../store/actions/shoppingBasketActions";

interface BasketItemCardProps {
  item: Product;
  amount: number;
  index: number;
  remove: Function;
}

const BasketItemCard: React.FC<BasketItemCardProps> = ({
  item,
  amount,
  index,
  remove,
}) => {
  const image = useGetImageUrl(item.image);

  return (
    <div className="basket-item">
      <div className="basket-item-img">
        {image ? <img src={image} alt={item.name} /> : <span>No image</span>}
      </div>
      <div className="basket-item-info">
        <div className="item-info-title">{item.name}</div>
        <div className="item-info-actions">
          <div className="info-acitions-input">
            <input type="number" value={amount} />
          </div>
          <div>{item.price * amount}$</div>
          <div className="info-acitions-delete" onClick={() => remove(index)}>
            x
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    remove: (index: number) => dispatch(basketRemoveAction(index)),
  };
};

export default connect(null, mapDispatchToProps)(BasketItemCard);
