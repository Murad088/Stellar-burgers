import React from 'react';
import { useSelector } from "react-redux";
import styles from "./order-details.module.css";
import doneIcon from "../../images/done.png";

const OrderDetails = () => {
  const { orderNum } = useSelector((state) => state.orderDetails);

  return (
    <div>
      <p className="mt-30 text text_type_digits-large">{orderNum.order.number || ''}</p>
      <p className={`${styles.mediumText} mt-8 text text_type_main-medium`}>идентефикатор заказа</p>
      <div className={`${styles.doneIcon}`}>
        <img src={doneIcon} alt="doneIcon" />
      </div>
      <p className={`${styles.smallText} mb-2 text text_type_main-small`}>Ваш заказ начали готовить</p>
      <p className={`${styles.smallText} mb-30 text text_type_main-small text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;