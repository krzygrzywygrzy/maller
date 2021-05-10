import "./basket.css";
import { connect } from "react-redux";
import Basket from "../../models/basket";
import { rootState } from "../../store/reducers/rootReducer";
import React, { useEffect } from "react";
import useGetByPath from "../../services/useGetByPath";

interface BasketProps {
  basket: Basket;
}

const BasketPage: React.FC<BasketProps> = ({ basket }: BasketProps) => {
  useEffect(() => {
    document.title = `basket (${basket.items.length})`;
  }, [basket.items.length]);

  const items = useGetByPath(basket.items);

  return (
    <div className="container basket-container">
      {basket.items.length > 0 ? (
        <div>
          {items.status === "success" ? (
            <div className="item-list">
              {items.items.map((item, index) => {
                return (
                  <div key={index}>
                    {item.name} {item.price} {basket.items[index].amount}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="loading">
              <span>loading...</span>
            </div>
          )}
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

export default connect(mapStateToProps)(BasketPage);
