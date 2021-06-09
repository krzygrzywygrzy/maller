import React, { useEffect } from "react";
import useGetHeader from "../../services/useGetHeader";
import HeaderMain from "./header-main";
import "./home.css";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "maller";
  }, []);

  const homeHeaderMain = useGetHeader("main");

  return (
    <div className="container">
      <div className="home-header">
        {homeHeaderMain.status === "success" ? <HeaderMain data={homeHeaderMain.data} /> : <span>loading...</span>}
        <div></div>
      </div>
    </div>
  );
};

export default Home;
