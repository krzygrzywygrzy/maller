import React, { useEffect } from "react";
import useGetHeader from "../../services/useGetHeader";
import HeaderMain from "./header-main";
import HeaderSub from "./header-sub";
import "./home.css";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "maller";
  }, []);

  const homeHeaderMain = useGetHeader("main");
  const homeHeaderSub = useGetHeader("sub");

  return (
    <div className="container">
      <div className="home-header">
        {homeHeaderMain.status === "success" ? <HeaderMain data={homeHeaderMain.data} /> : <span>loading...</span>}
        {homeHeaderSub.status === "success" ? <HeaderSub data={homeHeaderSub.data} /> : <span>loading...</span>}
      </div>
    </div>
  );
};

export default Home;
