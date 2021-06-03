import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import User from "../../models/user";
import { rootState } from "../../store/reducers/rootReducer";
import { useLocation } from "wouter";
import { logOutAction } from "../../store/actions/authActions";
import "./profile.css";
import useGetOrders from "../../services/useGetOrders";
import OrderCard from "../../core/orderCard/orderCard";
import useGetAddresses from "../../services/useGetAddreses";
import AddressForm from "../../core/addressForm/addressForm";
import Address from "../../models/address";

interface ProfilePageProps {
  user: User;
  logOutAction(): void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  logOutAction,
}: ProfilePageProps) => {
  const [, setLocation] = useLocation();

  //redirect to home screen when there is no authenticated user
  useEffect(() => {
    if (user.uid === undefined) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  //set the website title
  useEffect(() => {
    document.title = `Profile - ${user.name} ${user.surname}`;
  }, [user.name, user.surname]);

  const handleLogOut = () => {
    logOutAction();
    setLocation("/login");
  };

  //
  //getting orders
  const orders = useGetOrders();

  //
  //addresses
  const addresses = useGetAddresses();
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const saveNewAddress = (address: Address) => {
    //saveNewAddress(address);
    //TODO: repair to much recursion error
    setShowAddressForm(false);
  };

  return (
    <div>
      <div className="container">
        <div className="profile">
          <div>
            <section>
              <div className="profile-orders">
                <div className="profile-section-title">
                  <span>Your orders</span>
                </div>
                {orders.status === "success" ? (
                  <div>
                    {orders.data.map((item, index) => {
                      return (
                        <OrderCard key={index} index={index} order={item} />
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <span>
                      {orders.status === "error"
                        ? "and error accoured while loading your orders history..."
                        : "loading..."}
                    </span>
                  </div>
                )}
              </div>
            </section>
            <section>
              <div className="profile-address">
                <div className="profile-section-title">
                  <span>Your addressess</span>
                </div>
                {addresses.status === "success" ? (
                  <div>
                    {addresses.data.length > 0 ? (
                      <div></div>
                    ) : (
                      <div>
                        <span>You have no saved adresses</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {" "}
                    <span>
                      {addresses.status === "error"
                        ? "and error accoured while loading list of your addresses..."
                        : "loading..."}
                    </span>
                  </div>
                )}

                {showAddressForm ? (
                  <AddressForm saveData={saveNewAddress} />
                ) : (
                  <button onClick={() => setShowAddressForm(true)}>
                    Add address
                  </button>
                )}
              </div>
            </section>
          </div>
          <div>
            <div className="profile-info">
              <div className="info-name">
                <span>
                  {user.name} {user.surname}
                </span>
                <button onClick={handleLogOut}>log out</button>
              </div>
              <div className="info-email">
                <span>email: {user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    logOutAction: () => dispatch(logOutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
