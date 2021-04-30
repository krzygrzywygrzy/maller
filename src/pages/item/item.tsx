import React, { useState } from "react";
import { connect } from "react-redux";
import SearchBy from "../../interfaces/searchBy";
import useGetSpecificItem from "../../services/useGetSpecificItem";
import { rootState } from "../../store/reducers/rootReducer";
import "./item.css";

interface ItemPageProps {
  docId: string;
  searchBy: SearchBy;
}

const ItemPage: React.FC<ItemPageProps> = ({
  docId,
  searchBy,
}: ItemPageProps) => {
  const response = useGetSpecificItem(docId, searchBy);
  const [amount, setAmount] = useState<number>(1);

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value);
    if (newAmount >= 0) setAmount(newAmount);
    else setAmount(0);
  };

  const buildRating = () => {
    let rating = "";
    if (response.item && response.item.rating)
      for (let i = 0; i < response.item.rating; i++) rating += "⭐";

    console.log(rating);
    return rating;
  };

  return (
    <div className="container unselectable">
      {response.status === "success" && (
        <div className="product-display">
          <div className="product-name">{response.item?.name} </div>
          <div className="mid-section">
            <div className="mid-section-photos"></div>
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
                <button>Add to basket</button>
              </div>
              <span>in stock: {response.item?.inStock}</span>
              <div className="buy-form-additional">
                <span>Order in 2 hours to collect on Moneday</span>
                <br></br>
              </div>
            </div>
          </div>
          <div className="description">
            <div className="description-title">
              <span>Description</span>
            </div>
            {response.item?.description ? (
              <span>{response.item.description}</span>
            ) : (
              <span>Description for this product is not provided yet!</span>
            )}
          </div>
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

export default connect(mapStateToProps)(ItemPage);
