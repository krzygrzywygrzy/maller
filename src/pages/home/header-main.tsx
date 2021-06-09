import React from "react";
import { Link } from "wouter";
import HomeHeader from "../../models/homeHeader";
import useGetImageUrl from "../../services/useGetImageUrl";

interface HeaderMainProps {
  data?: HomeHeader;
}

const HeaderMain: React.FC<HeaderMainProps> = ({ data }) => {
  const image = useGetImageUrl(data?.image);

  return (
    <Link href={`/item/${data?.link}`}>
      <div className="home-header-main">
        <div className="header-main-image">
          <img src={image} alt="image" />
        </div>
        <div className="header-main-content">
            <div className="header-main-content-title">{data?.title}</div>
        </div>
      </div>
    </Link>
  );
};

export default HeaderMain;
