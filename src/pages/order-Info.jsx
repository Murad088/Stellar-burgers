import styles from "./styles.module.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WS_PROFILE_CONNECTION_START, WS_PROFILE_CONNECTION_CLOSED, WS_GET_PROFILE_ORDERS } from "../services/actions/WebsocketActions";
import { OrderModal } from "../components/order/order-modal";

export const OrderInfo = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken")?.split(" ")?.[1];

  useEffect(() => {
    dispatch({ 
      type: WS_PROFILE_CONNECTION_START,
      payload: `?token=${token}` });
    dispatch({
      type: WS_GET_PROFILE_ORDERS,
      payload: `?token=${token}`,
    });
    return () => {
      dispatch({ 
        type: WS_PROFILE_CONNECTION_CLOSED 
      })
    }
  }, [dispatch, token]);

  return (
    <div className={styles.readyOrder}>
        <OrderModal />
    </div>
  );
};