import { connect } from 'react-redux';
import Basket from '../../interfaces/basket';
import './navbar.css';

const Navbar = (props: any) => {
    let basket: Basket = props.basket;
    console.log(basket);

    return (
        <div className="navbar-container">
            <div>Shopping</div>
            <div>Searchbar</div>
            <div>basket {basket.items.length}</div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        basket: state.basket,
    }
}

export default connect(mapStateToProps)(Navbar);