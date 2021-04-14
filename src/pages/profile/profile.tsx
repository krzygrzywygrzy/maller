import React, { useEffect } from "react";
import { connect } from "react-redux";
import User from "../../interfaces/user";
import { rootState } from "../../store/reducers/rootReducer";
import { useLocation } from "wouter";

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
}: ProfilePageProps) => {
  // eslint-disable-next-line
  const [_, setLocation] = useLocation();

  useEffect(() => {
    console.log("works");
    if (user.uid === undefined) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  return <div>
      <div className="container">
          d
      </div>
  </div>;
};

const mapStateToProps = (state: rootState) => {
  return {
    user: state.user,
  };
};



export default connect(mapStateToProps)(ProfilePage);
