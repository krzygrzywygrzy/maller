import "./basket.css";
import { connect } from "react-redux";
import Basket from "../../models/basket";
import { rootState } from "../../store/reducers/rootReducer";
import React, { useEffect, useState } from "react";
import BasketItemCard from "./basketItem";

interface BasketProps {
  basket: Basket;
  remove: Function;
}

const BasketPage: React.FC<BasketProps> = ({ basket, remove }: BasketProps) => {
  useEffect(() => {
    document.title = `basket (${basket.items.length})`;
  }, [basket.items.length]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let t: number = 0;
    for (let i = 0; i <= basket.items.length - 1; i++) {
      t += basket.items[i].amount * basket.items[i].price;
    }
    setTotal(t);
  }, [basket]);

  const handleRemove = (index: number) => remove(index);
  return (
    <div className="container">
      {basket.items.length > 0 ? (
        <div className="basket-container">
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
          <div className="basket-summary">
            <span>Total: {total}$</span><br></br>
            <button>Checkout</button>
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
    remove: (index: number) =>
      dispatch({ type: "REMOVE_ITEM", payload: index }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
