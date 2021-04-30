import React from "react";
import { connect } from "react-redux";
import SearchBy from "../../interfaces/searchBy";
import useGetSpecificItem from "../../services/useGetSpecificItem";
import { rootState } from "../../store/reducers/rootReducer";

interface ItemPageProps {
  docId: string;
  searchBy: SearchBy;
}

const ItemPage: React.FC<ItemPageProps> = ({
  docId,
  searchBy,
}: ItemPageProps) => {
  const response = useGetSpecificItem(docId, searchBy);

  return (
    <div className="container">
      {response.status === "success" && (
        <div className="product-display">{response.item?.name}</div>
      )}
    </div>
  );
};

const mapStateToProps = (state: rootState) => {
  return {
    searchBy: state.searchBy,
  };
};

export default connect(mapStateToProps)(ItemPage);
