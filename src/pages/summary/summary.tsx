import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Basket from "../../models/basket";
import { rootState } from "../../store/reducers/rootReducer";
import "./summary.css";
import { useLocation } from "wouter";
import useGetAddresses from "../../services/useGetAddreses";
import AddressForm from "../../core/addressForm/addressForm";
import checkoutService from "../../services/checkout";
import showSnackBar from "../../core/functions/snackBar";

interface SummaryPageProps {
  basket: Basket;
  clearBasketAction(): void;
}

const SummaryPage: React.FC<SummaryPageProps> = ({
  basket,
  clearBasketAction,
}) => {
  const [, setLocation] = useLocation();

  //
  //addresses
  //
  const addresses = useGetAddresses();
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);

  //TODO: choose addresses
  // eslint-disable-next-line
  const [chosenAddress, setChosenAddres] = useState<number>(0);

  //
  //payment
  //
  const [chosenPayment, setChosenPayment] = useState<number>(1);
  //TODO: get options from firebase
  const paymentMethods: Array<string> = [
    "Visa",
    "MasterCard",
    "PayPal",
    "cash on delivery",
  ];

  //if basket is empty redirects to home screeCLEAR_BASKET
  //checkout won't happen with empty basket
  useEffect(() => {
    if (basket.items.length === 0) setLocation("/");

    document.title = "summary";
  }, [basket, setLocation]);

  //get total price of all products
  //TODO: make custom hook to use it here and in basket screen
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    let t: number = 0;
    for (let i = 0; i <= basket.items.length - 1; i++) {
      t += basket.items[i].amount * basket.items[i].price;
    }
    setTotal(t);
  }, [basket]);

  // handles checking out
  const checkout = async () => {
    const result = await checkoutService(basket, paymentMethods[chosenPayment]);
    if (result === "success") {
      clearBasketAction();
      showSnackBar("Success! Your order will be completed soon!");
      setLocation("/");
    } else {
      showSnackBar("Cannot checkout! Check your internet connection");
    }
  };

  return (
    <div className="container summary">
      <div className="summary-options">
        <div>
          <span style={{ fontSize: "1.25rem" }}>Summary</span>
        </div>
        <div className="summary-section">
          <span>Address</span>
          <div className="mb1">
            {addresses.status === "success" ? (
              <div>
                {addresses.data.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.city} {item.street} {item.building}
                    </div>
                  );
                })}
              </div>
            ) : (
              <span>
                {addresses.status === "error"
                  ? "cannot load your address list"
                  : "loading addresses..."}
              </span>
            )}
            {!showAddressForm && (
              <button
                className="add-btn"
                onClick={() => setShowAddressForm(true)}
              >
                Add new address
              </button>
            )}
            {showAddressForm && <AddressForm />}
          </div>
          <span>Payment</span>
          <div>
            {paymentMethods.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setChosenPayment(index)}
                  className="payment-card"
                >
                  {index === chosenPayment ? (
                    <div className="mark mark-orange"></div>
                  ) : (
                    <div className="mark"></div>
                  )}
                  <div>{item}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div></div>
      </div>
      <div className="summary-checkout">
        <span className="summary-basket-title">In your basket:</span>
        <br />
        {basket.items.map((item, index) => {
          return (
            <div key={index} className="summary-basket-item">
              {item.name} x{item.amount}
            </div>
          );
        })}
        <div className="summary-total">
          <span>Total: {total}$</span>
        </div>
        <button onClick={() => checkout()}>Checkout</button>
      </div>
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
    clearBasketAction: () => dispatch({ type: "CLEAR_BASKET" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
