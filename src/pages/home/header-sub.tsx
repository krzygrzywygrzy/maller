import React from "react";
import HomeHeader from "../../models/homeHeader";
import { Link } from "wouter";
import useGetImageUrl from "../../services/useGetImageUrl";

interface HeaderSubProps {
  data?: HomeHeader;
}

const HeaderSub: React.FC<HeaderSubProps> = ({ data }) => {
  const img = useGetImageUrl(data?.image);

  return (
    <Link href={`/item/${data?.link}`}>
      <div className="home-header-sub">
        <div className="header-sub-img">
            <img src={img} alt="img" />
        </div>
        <div className="header-sub-title">
            {data?.title}
        </div>
      </div>
    </Link>
  );
};

export default HeaderSub;
