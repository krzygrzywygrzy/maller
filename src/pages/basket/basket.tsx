import './basket.css';
import { connect } from 'react-redux';
import Basket from '../../interfaces/basket';


const BasketPage = (props) => {
    //props
    let basket: Basket = props.basket;

    document.title = `basket (${basket.items.length})`;

    return (
        <div className="container basket-container">
            { basket.items.length > 0 ? <div className="item-list">
                    {/*  */}
            </div> : <div className="empty-list">
                <span style={{fontSize: "2rem"}}>Your bakset is empty!</span>
                <p>Add some product to order them easly!</p>
            </div>}
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        basket: state.basket,
    };
}

export default connect(mapStateToProps)(BasketPage);