import React from "react";
import { Link } from "wouter";
import HomeHeader from "../../models/homeHeader";
import useGetImageUrl from "../../services/useGetImageUrl";

//icons
import { ReactComponent as RightArrow } from "../../assets/icons/right_arr.svg";

interface HeaderMainProps {
  data?: HomeHeader;
}

const HeaderMain: React.FC<HeaderMainProps> = ({ data }) => {
  const image = useGetImageUrl(data?.image);

  return (
    <Link href={`/item/${data?.link}`}>
      <div className="home-header-main">
        <div className="header-main-image">
          <img src={image} alt="img" />
        </div>
        <div className="header-main-content">
          <div className="header-main-content-title">{data?.title}</div>
          <div className="header-main-content-bottom">
            <div className="bottom-link">
              <div style={{marginBottom: 3}}>check out the product</div>{" "}
              <RightArrow height="18" className="arrow" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeaderMain;
