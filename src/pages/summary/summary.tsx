import React, { useEffect } from "react";
import { connect } from "react-redux";
import Basket from "../../models/basket";
import { rootState } from "../../store/reducers/rootReducer";
import "./summary.css";
import { useLocation } from "wouter";

interface SummaryPageProps {
  basket: Basket;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ basket }) => {
  // eslint-disable-next-line
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (basket.items.length === 0) setLocation("/"); 
    
    document.title = "summary";
  }, [basket, setLocation]);

  return <div className="container">summary</div>;
};

const mapStateToProps = (state: rootState) => {
  return {
    basket: state.basket,
  };
};
export default connect(mapStateToProps)(SummaryPage);
