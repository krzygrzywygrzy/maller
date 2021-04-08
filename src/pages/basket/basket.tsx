import './basket.css';
import { connect } from 'react-redux';
import Navbar from '../../core/navbar/navbar';
import Basket from '../../interfaces/basket';

const BasketPage = (props) => {
    //props
    let basket: Basket = props.basket;

    console.log(basket.items.length);


    return (
        <div>
            <Navbar />
            <div className="container basket-container">
                <div className="item-list">
                    {basket.items.length > 0 ? <div></div> : 
                    <div className="empty-list">
                        <div>Your basket is empty</div>
                    </div>}
                </div>
                <div className="basket-summary"></div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
    };
}

export default connect(mapStateToProps)(BasketPage);