import { connect } from "react-redux";
import { Link } from "wouter";
import Basket from "../../interfaces/basket";
import "./navbar.css";
import { useState, useEffect, useRef } from 'react';
import CategoryList from "./categoryList";
import { getCategoryAction } from "../../store/actions/categoryActions";
import Category from "../../interfaces/categories";



const Navbar = (props: any) => {
  const [showCategory, setShowCategory] = useState<Boolean>(false); 
  const menuRef = useRef(null);

  //props
  let basket: Basket = props.basket;
  let categories: Array<Category> = props.categories;
  let getCategories: Function = props.getCategories;

  useEffect(()=> {
    if(categories.length === 0)
      getCategories();
  },[]);

  useEffect(() => {
    //TODO: close menu after clicking outside of it
    if(showCategory){
      
    }

  }, [showCategory]);

  const handleChange = (phrase: String) => {
    //TODO: search in db
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-title"><Link href="/">maller</Link></div>
        <div>
            <div className="search-box">
              <input type="text" onChange={(e)=> handleChange(e.target.value) } 
                placeholder="toys, health, sports..." />
              <div className="search_btn">Search</div>   
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
      {showCategory && <CategoryList ref={menuRef} />} 
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    basket: state.basket,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getCategories: () => dispatch(getCategoryAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


