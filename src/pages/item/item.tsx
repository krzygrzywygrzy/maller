import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CommentCard from "../../core/commentCard/commentCard";
import Basket, { BasketItem } from "../../models/basket";
import SearchBy from "../../models/searchBy";
import useGetImageUrl from "../../services/useGetImageUrl";
import useGetItemByObjectID from "../../services/useGetItemByObjectID";
import { basketAddAction } from "../../store/actions/shoppingBasketActions";
import { rootState } from "../../store/reducers/rootReducer";
import "./item.css";

interface ItemPageProps {
  objectId: string;
  searchBy: SearchBy;
  addToBasket(item: BasketItem): void;
  basket: Basket;
  addAmountToBasket(amount: number, index: number): void;
}

const ItemPage: React.FC<ItemPageProps> = ({
  objectId,
  addToBasket,
  basket,
  addAmountToBasket,
}: ItemPageProps) => {
  const item: any = useGetItemByObjectID(objectId);

  const [amount, setAmount] = useState<number>(1);


  
  const imageUrl = useGetImageUrl(item.data.image);

  useEffect(() => {
    document.title = `${item.data.name}`;
  }, [item]);

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value);
    if (newAmount >= 0) setAmount(newAmount);
    else setAmount(0);
  };

  const handleBasket = () => {
    //check if product is in basket & assign index of it if exists
    let index: number | undefined;
    for (let i = 0; i < basket.items.length; i++) {
      if (basket.items[i].objectID === item.data.objectID) {
        index = i;
        break;
      }
    }

    //if product is in basket change its amount
    if (index !== undefined) addAmountToBasket(amount, index);
    //else add new item to basket
    else {
        addToBasket({
          amount,
          objectID: item.data.objectID,
          name: item.data.name,
          image: item.data.image,
          price: item.data.price,
        });
    }
  };

  return (
    <div className="container unselectable">
      {item.status === "success" ? (
        <div className="product-display">
          <div className="product-name">{item.data.name} </div>
          <div className="mid-section">
            <div className="mid-section-photos">
              {item.data.image && imageUrl !== "" ? (
                <img src={imageUrl} alt={item.data.name} />
              ) : (
                <div className="no-img">No image provided</div>
              )}
            </div>
            <div className="mid-section-buy">
              <div className="buy-price">
                <span>{item.data.price}$</span>
              </div>
              <div className="buy-form">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    changeAmount(e);
                  }}
                ></input>
                <button onClick={() => handleBasket()}>Add to basket</button>
              </div>
              <span>in stock: {item.data.inStock}</span>
              <div className="buy-form-additional">
                <span>Order in 2 hours to collect on Moneday</span>
                <br></br>
              </div>
            </div>
          </div>
          <div className="description">
            <div className="section-title">
              <span>Description</span>
            </div>
            {item.data.description ? (
              <div className="desctipion-content" dangerouslySetInnerHTML={{ __html: item.data.description }}></div>
            ) : (
              <span>Description for this product is not provided yet!</span>
            )}
          </div>
          <div className="opinions">
            <div className="section-title">Opinions</div>
            {item.data.comments && item.data.comments.length > 0 ? (
              <div>
                {item.data.comments.map((item, index) => {
                  return (
                    <div key={index}>
                      <CommentCard name={item.name} content={item.content} rating={item.rating} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="desctipion-content">No one have given feedback yet!</span>
            )}
          </div>
        </div>
      ) : (
        <div className="loading">
          <span>loading...</span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    searchBy: state.searchBy,
    basket: state.basket,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addToBasket: (item: BasketItem) => dispatch(basketAddAction(item)),
    addAmountToBasket: (amount: number, index: number) =>
      dispatch({ type: "ADD_ITEM_AMOUNT", payload: { amount, index } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
