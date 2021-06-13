import React, { useEffect } from "react";
import useWindowResise from "../../core/functions/useWindowResize";
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

  const windowWidth = useWindowResise();

  return (
    <div className="container">
      <div className="home-header">
        {homeHeaderMain.status === "success" ? <HeaderMain data={homeHeaderMain.data} /> : <span>loading...</span>}
        {homeHeaderSub.status === "success" ? (
          <div>
            {windowWidth > 1000 ? <HeaderSub data={homeHeaderSub.data} /> : <HeaderMain data={homeHeaderSub.data} />}
          </div>
        ) : (
          <span>loading...</span>
        )}
      </div>
    </div>
  );
};

export default Home;
