import React from "react";
import { SearchResults } from "../../services/useSearchInDB";

interface SearchBoxProps {
  results: SearchResults;
}

const SearchBox: React.FC<SearchBoxProps> = ({ results }) => {
  return <div className="search-box">jdddddd</div>;
};

export default SearchBox;
