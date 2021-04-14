import React, { useEffect } from "react";
import { connect } from "react-redux";
import User from "../../interfaces/user";
import { rootState } from "../../store/reducers/rootReducer";
import { useLocation } from "wouter";
import "./profile.css";

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
}: ProfilePageProps) => {
  // eslint-disable-next-line
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (user.uid === undefined) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  const addPaymentMethod = () => {
    console.log("payment!");
  };

  return (
    <div>
      <div className="container">
        <div className="profile">
          <div>
            <div className="profile-orders">
              No orders yet!
            </div>
            <div className="profile-address"></div>
          </div>
          <div>
            <div className="profile-info">
              <div className="info-name">
                <span>
                  {user.name} {user.surname}
                </span>
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

export default connect(mapStateToProps)(ProfilePage);
