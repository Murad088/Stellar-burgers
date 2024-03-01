import styles from "./styles.module.css";
import React from "react";
import { useEffect } from "react";
import { WS_PROFILE_CONNECTION_START, WS_PROFILE_CONNECTION_CLOSED, WS_GET_PROFILE_ORDERS } from "../services/actions/WebsocketActions";
import { OrderModal } from "../components/order/order-modal";
import { useAppDispatch } from "../utils/hooks";

export const OrderInfo = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken")?.split(" ")?.[1];

  useEffect(() => {
    dispatch({ 
      type: WS_PROFILE_CONNECTION_START,
      payload: `?token=${token}` 
    });
  }, [dispatch, token]);

  return (
    <div className={styles.readyOrder}>
        <OrderModal />
    </div>
  );
};