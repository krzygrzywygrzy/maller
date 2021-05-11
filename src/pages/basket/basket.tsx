import "./basket.css";
import { connect } from "react-redux";
import Basket from "../../models/basket";
import { rootState } from "../../store/reducers/rootReducer";
import React, { useEffect } from "react";
import BasketItemCard from "./basketItem";
import { basketRemoveAction } from "../../store/actions/shoppingBasketActions";

interface BasketProps {
  basket: Basket;
  remove: Function;
}

const BasketPage: React.FC<BasketProps> = ({ basket, remove }: BasketProps) => {
  useEffect(() => {
    document.title = `basket (${basket.items.length})`;
  }, [basket.items.length]);

  const handleRemove = (index: number) => remove(index);
  return (
    <div className="container basket-container">
      {basket.items.length > 0 ? (
        <div>
          <div className="item-list">
            {basket.items.map((item, index) => {
              return (
                <div key={index}>
                  <BasketItemCard
                    item={item}
                    amount={basket.items[index].amount}
                    index={index}
                    remove={handleRemove}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty-list">
          <span style={{ fontSize: "2rem" }}>Your bakset is empty!</span>
          <p>Add some product to order them easly!</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    basket: state.basket,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    remove: (index: number) => dispatch(basketRemoveAction(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
