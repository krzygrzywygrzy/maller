import React, { useEffect } from "react";
import { connect } from "react-redux";
import User from "../../models/user";
import { rootState } from "../../store/reducers/rootReducer";
import { useLocation } from "wouter";
import "./profile.css";
import { logOutAction } from "../../store/actions/authActions";

interface ProfilePageProps {
  user: User;
  logOutAction();
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  logOutAction,
}: ProfilePageProps) => {
  // eslint-disable-next-line
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (user.uid === undefined) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  useEffect(() => {
    document.title = `Profile - ${user.name} ${user.surname}`;
  }, [user.name, user.surname]);

  const addPaymentMethod = () => {
    console.log("payment!");
  };

  const handleLogOut = () => {
    logOutAction();
    setLocation("/login");
  };

  return (
    <div>
      <div className="container">
        <div className="profile">
          <div>
            <div className="profile-orders">No orders yet!</div>
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
              <div className="payment-options">
                <span>No payment options yet!</span>
                <button onClick={addPaymentMethod}>add</button>
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
