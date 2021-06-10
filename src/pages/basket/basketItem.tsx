import React from "react";
import { connect } from "react-redux";
import { BasketItem } from "../../models/basket";
import useGetImageUrl from "../../services/useGetImageUrl";
import { Link } from "wouter";

interface BasketItemCardProps {
  item: BasketItem;
  amount: number;
  index: number;
  remove: Function;
  changeAmount(index: number, amount: number): void;
}

const BasketItemCard: React.FC<BasketItemCardProps> = ({
  item,
  amount,
  index,
  remove,
  changeAmount,
}) => {
  const image = useGetImageUrl(item.image);

  /**
   * changing amount of product to order
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeAmount(index, parseInt(e.target.value));
  };

  return (
    <div className="basket-item">
      <Link href={`/item/${item.objectID}`}>
      <div className="basket-item-img">
        {image ? <img src={image} alt={item.name} /> : <span>No image</span>}
      </div>
      </Link>
      <div className="basket-item-info">
        <Link href={`/item/${item.objectID}`}>
          <div className="item-info-title">{item.name}</div>
        </Link>
        <div className="item-info-actions">
          <div className="info-acitions-input">
            <input type="number" value={amount} onChange={handleChange} />
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
    changeAmount: (index: number, amount: number) =>
      dispatch({ type: "CHANGE_AMOUNT", payload: { index, amount } }),
  };
};

export default connect(null, mapDispatchToProps)(BasketItemCard);
