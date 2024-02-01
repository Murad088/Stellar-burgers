import React from "react";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_GET_PROFILE_ORDERS, WS_PROFILE_CONNECTION_CLOSED, WS_PROFILE_CONNECTION_START, } from "../services/actions/WebsocketActions";
import { OrderCard } from "../components/order/order-card"; 
import { wsReducer } from "../services/reducers/WebsocketReducer";

export const OrderPage = () => {
  const dispatch = useDispatch();

  const usersOrders = useSelector(store => store.wsReducer.userOrders);

  const token = localStorage.getItem("accessToken")?.split(" ")?.[1];

  useEffect(() => {
    dispatch({
      type: WS_PROFILE_CONNECTION_START,
      payload: `?token=${token}`,
    });
    dispatch({
      type: WS_GET_PROFILE_ORDERS,
      payload: `?token=${token}`,
    });
    return () => {
      dispatch({ type: WS_PROFILE_CONNECTION_CLOSED });
    };
  }, [dispatch, token]);

  window.addEventListener('beforeunload', () => {
    dispatch({ type: WS_PROFILE_CONNECTION_CLOSED });
   });
  

  const reversed = usersOrders?.reverse();
  return (
    <div>
      <section className={styles.OrdersSection}>
        {reversed?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </section>
    </div>
  );
};