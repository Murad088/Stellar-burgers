import styles from "./app.module.css";
import React from "react";
import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "../app-header/app-header";
import { fetchIngredients } from "../../services/actions/IngredientAction";
import Menu from "../menu/menu";
import { Registration } from "../../pages/registration";
import { ResPassword } from "../../pages/res-password";
import { ForgotPassword } from "../../pages/forgot-password";
import { LoginPage } from "../../pages/login";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import { ProfilePage } from "../../pages/profile-page";
import { IngredientPage } from "../../pages/ingredient-single";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OrderPage } from "../../pages/order-page";
import { Feed } from "../../pages/feed";
import { FeedInfo } from "../../pages/feed-Info";
import { ProfileUser } from "../../pages/profile-user";
import { OrderInfo } from "../../pages/order-Info";
import { checkUserAuth } from "../../services/actions/AuthActions";
import { useAppDispatch } from "../../utils/hooks";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(checkUserAuth());
    }
    dispatch(fetchIngredients());    
  }, [dispatch]);

  const closeIngredientModal = () => {
    navigate(-1);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Menu />} />
        <Route path="/reset-password" element={<ResPassword />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        >
          <Route path="/profile" element={<ProfileUser />} />
          <Route path="/profile/orders" element={<OrderPage />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<FeedInfo />} />

        <Route
          path="/profile/orders/:number" 
          element={<ProtectedRouteElement element={<OrderInfo />} />}
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal
                onClose={closeIngredientModal}
                title={"Детали ингредиента"}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="feed/:number"
            element={
              <Modal onClose={closeIngredientModal} title={""}>
                <FeedInfo />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:number"
            element={
              <Modal onClose={closeIngredientModal} title={""}>
                {<ProtectedRouteElement element={<OrderInfo />} />}
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;