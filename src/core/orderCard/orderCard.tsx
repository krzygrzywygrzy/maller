import React from "react";
import Order from "../../models/order";
import useGetImageUrl from "../../services/useGetImageUrl";
import "./orderCard.css";

interface OrderCardProps {
  index: number;
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ index, order }) => {
  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-index">{index + 1}</div>
        <div>
          Payment Status: <span className="order-status">{order.paymentStatus}</span>
        </div>
        <div>
          Shipment Status: <span className="order-status">teavelling...</span>
        </div>
      </div>
      <div className="order-card-items">
        {order.basket.items.map((item, i) => {
          return <OrderCardImg key={i} imgSource={item.image} alt={Image.name} />;
        })}
      </div>
    </div>
  );
};

//
//Order Card Image
//

interface OrderCardImgProps {
  imgSource?: string;
  alt: string;
}

const OrderCardImg: React.FC<OrderCardImgProps> = ({ imgSource, alt }) => {
  const img = useGetImageUrl(imgSource);

  return (
    <div className="order-card-img">
      {img === "" && img === undefined ? (
        <div className="no-img">
          <span>no image</span>
        </div>
      ) : (
        <img src={img} alt={alt} />
      )}
    </div>
  );
};

export default OrderCard;
export { OrderCardImg };
