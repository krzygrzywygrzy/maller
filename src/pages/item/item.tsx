import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CommentCard from "../../core/commentCard/commentCard";
import showSnackBar from "../../core/functions/snackBar";
import SearchBy from "../../models/searchBy";
import { storage } from "../../services/firebase.config";
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
  const [imgUrl, setUrl] = useState<any>("");

  //TODO: make custom hook out of it
  useEffect(() => {
    const getImageUrl = async () => {
      if (response.item && response.item.image) {
        const storageRef = storage.ref();
        storageRef
          .child(response.item.image)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          })
          .catch(() => {
            showSnackBar("Cannot get image!");
          });
      }
    };
    document.title = `${response.item?.name}`;

    getImageUrl();
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
              {response.item?.image ? (
                <img src={imgUrl} alt={response.item.name} />
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
                    <CommentCard
                      key={index}
                      name={item.name}
                      content={item.content}
                      rating={item.rating}
                    />
                  );
                })}
              </div>
            ) : (
              <span className="desctipion-content">
                No one have given feedback yet!{" "}
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

export default connect(mapStateToProps)(ItemPage);
