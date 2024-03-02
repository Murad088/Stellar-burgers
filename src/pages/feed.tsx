import React from "react";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../services/actions/WebsocketActions";
import { OrderCard } from "../components/order/order-card";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

export const Feed = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken")?.split(" ")?.[1];

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `/all` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch, token]);

  const orders = useAppSelector(store => store.wsReducer.orders);
  const total = useAppSelector(store => store.wsReducer.total);
  const totalToday = useAppSelector(store => store.wsReducer.totalToday);

  return (
    <main className={styles.wrapper}>
      <h2 className={"text text_type_main-large pt-10 pb-5"}>Лента Заказов</h2>
      <div className={styles.mainFeed}>
        <section className={styles.OrdersSection}>
          {orders?.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </section>
        <section className={styles.OrdersTable}>
          <div className={styles.OrdersStatus}>
            <div className={styles.Done}>
              <h2 className={"text text_type_main-medium mb-6"}>Готовы:</h2>
              <ul className={styles.OrdersList}>
                {orders.slice(0, 20).map((num) =>
                  num.status === "done" ? (
                    <li
                      key={num._id}
                      className={
                        "text text_type_digits-default  text_color_success"
                      }
                    >
                      {num.number}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <div className={styles.Done}>
              <h2 className={"text text_type_main-medium mb-6"}>В работе:</h2>
              <ul className={styles.OrdersList}>
                {orders.slice(0, 20).map((num) =>
                  num.status === "pending" ? (
                    <li
                      key={num._id}
                      className={"text text_type_digits-default "}
                    >
                      {num.number}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
          <p className={"text text_type_main-medium mt-15"}>
            Выполнено за все время:
          </p>
          <p className={`${styles.glow} text text_type_digits-large mt-6`}>
            {total}
          </p>
          <p className={"text text_type_main-medium mt-15"}>
            Выполнено за все время:
          </p>
          <p className={`${styles.glow} text text_type_digits-large mt-6`}>
            {totalToday}
          </p>
        </section>
      </div>
    </main>
  );
};