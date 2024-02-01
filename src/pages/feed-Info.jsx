import React from "react";
import styles from "./styles.module.css";
import { OrderModal } from "../components/order/order-modal";

export const FeedInfo = () => {
  return (
    <div className={styles.readyOrder}>
        <OrderModal />
    </div>
  );
};