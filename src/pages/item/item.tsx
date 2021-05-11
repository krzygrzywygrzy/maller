import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CommentCard from "../../core/commentCard/commentCard";
import { BasketItem } from "../../models/basket";
import SearchBy from "../../models/searchBy";
import useGetImageUrl from "../../services/useGetImageUrl";
import useGetSpecificItem from "../../services/useGetSpecificItem";
import { basketAddAction } from "../../store/actions/shoppingBasketActions";
import { rootState } from "../../store/reducers/rootReducer";
import "./item.css";

interface ItemPageProps {
  docId: string;
  searchBy: SearchBy;
  addToBasket: (item: BasketItem) => {};
}

const ItemPage: React.FC<ItemPageProps> = ({
  docId,
  searchBy,
  addToBasket,
}: ItemPageProps) => {
  const response = useGetSpecificItem(docId, searchBy);
  const [amount, setAmount] = useState<number>(1);

  const imageUrl = useGetImageUrl(response.item?.image);

  useEffect(() => {
    document.title = `${response.item?.name}`;
  }, [response]);

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value);
    if (newAmount >= 0) setAmount(newAmount);
    else setAmount(0);
  };

  return (
    <div className="container unselectable">
      {response.status === "success" ? (
        <div className="product-display">
          <div className="product-name">{response.item?.name} </div>
          <div className="mid-section">
            <div className="mid-section-photos">
              {response.item?.image && imageUrl !== "" ? (
                <img src={imageUrl} alt={response.item.name} />
              ) : (
                <div className="no-img">No image provided</div>
              )}
            </div>
            <div className="mid-section-buy">
              <div className="buy-price">
                <span>{response.item?.price}$</span>
              </div>
              <div className="buy-form">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    changeAmount(e);
                  }}
                ></input>
                <button
                  onClick={() => {
                    if (response.item?.path)
                      addToBasket({
                        amount,
                        path: response.item?.path,
                        name: response.item.name,
                        image: response.item.image,
                        price: response.item.price
                      });
                  }}
                >
                  Add to basket
                </button>
              </div>
              <span>in stock: {response.item?.inStock}</span>
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
            {response.item?.description ? (
              <div
                className="desctipion-content"
                dangerouslySetInnerHTML={{ __html: response.item.description }}
              ></div>
            ) : (
              <span>Description for this product is not provided yet!</span>
            )}
          </div>
          <div className="opinions">
            <div className="section-title">Opinions</div>
            {response.item?.comments ? (
              <div>
                {response.item?.comments?.map((item, index) => {
                  return (
                    <div key={index}>
                      <CommentCard
                        name={item.name}
                        content={item.content}
                        rating={item.rating}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="desctipion-content">
                No one have given feedback yet!
              </span>
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
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addToBasket: (item: BasketItem) => dispatch(basketAddAction(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
