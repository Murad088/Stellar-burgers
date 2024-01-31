import styles from "./styles.module.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WS_PROFILE_CONNECTION_START, WS_PROFILE_CONNECTION_CLOSED } from "../services/actions/WebsocketActions";
import { OrderModal } from "../components/order/order-modal";

export const OrderInfo = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken")?.split(" ")?.[1];

  useEffect(() => {
    let isUnmounted = false;
    dispatch({ type: WS_PROFILE_CONNECTION_START, payload: `token=${token}` });

    return () => {
      if (isUnmounted) {
        return;
      }

      isUnmounted = true;
      dispatch({ type: WS_PROFILE_CONNECTION_CLOSED });
    }
  }, [dispatch, token]);

  return (
    <div className={styles.readyOrder}>
        <OrderModal />
    </div>
  );
};
