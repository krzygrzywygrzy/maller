import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Basket from "../../models/basket";
import { rootState } from "../../store/reducers/rootReducer";
import "./summary.css";
import { useLocation } from "wouter";
import useGetAddresses from "../../services/useGetAddreses";
import AddressForm from "../../core/addressForm/addressForm";

interface SummaryPageProps {
  basket: Basket;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ basket }) => {
  const [, setLocation] = useLocation();
  const addresses = useGetAddresses();

  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);

  useEffect(() => {
    if (basket.items.length === 0) setLocation("/");

    document.title = "summary";
  }, [basket, setLocation]);

  return (
    <div className="container summary">
      <div className="summary-options">
        <div>
          <span style={{ fontSize: "1.25rem" }}>Summary</span>
        </div>
        <div className="summary-section">
          <span>Address</span>
          <div>
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
        </div>
        <div></div>
      </div>
      <div>checkout</div>
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    basket: state.basket,
  };
};
export default connect(mapStateToProps)(SummaryPage);
