import React, { useEffect } from "react";
import { connect } from "react-redux";
import User from "../../models/user";
import { rootState } from "../../store/reducers/rootReducer";
import { useLocation } from "wouter";
import { logOutAction } from "../../store/actions/authActions";
import "./profile.css";
import useGetOrders from "../../services/useGetOrders";
import OrderCard from "../../core/orderCard/orderCard";

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

  return (
    <div>
      <div className="container">
        <div className="profile">
          <div>
            <div className="profile-orders">
              <div className="profile-section-title">
                <span>Your orders</span>
              </div>
              {orders.status === "success" ? (
                <div>
                  {orders.data.map((item, index) => {
                    return <OrderCard key={index} index={index} order={item} />;
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
            <div className="profile-address"></div>
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
