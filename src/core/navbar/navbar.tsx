import { connect } from "react-redux";
import { Link } from "wouter";
import Basket from "../../interfaces/basket";
import "./navbar.css";
import { useState } from 'react';
import CategoryList from "./categoryList";



const Navbar = (props: any) => {
  const [showCategory, setShowCategory] = useState<Boolean>(false); 

  //props
  let basket: Basket = props.basket;


  const handleChange = (phrase: String) => {
    //TODO: search in db
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div>Shopping</div>
        <div>
            <div className="search-box">
              <input type="text" onChange={(e)=> handleChange(e.target.value) } 
                placeholder="toys, health, sports..." />
              <div>Search</div>   
            </div>
        </div>
        <div>
          <Link href="/basket">basket {basket.items.length}</Link>
        </div>
      </div>
      <div className="category-container">
        <div className="categories" onClick={()=> {setShowCategory(!showCategory)}}>
            Categories
        </div>
        <div className="side-category">Sale!</div>
        <div className="side-category">Spring Sale!</div>
      </div>
      {showCategory && <CategoryList />} 
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    basket: state.basket,
  };
};

export default connect(mapStateToProps)(Navbar);
