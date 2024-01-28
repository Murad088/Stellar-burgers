import styles from "./app.module.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "../app-header/app-header";
import { fetchIngredients } from "../../services/actions/IngredientAction";
import Menu from "../menu/menu";
import { Registration } from "../../pages/registration";
import { ResPassword } from "../../pages/res-password";
import { ForgotPassword } from "../../pages/forgot-password";
import { LoginPage } from "../../pages/login";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import { ProfilePage } from "../../pages/profile-page";
import { IngredientPage } from "../../pages/ingredient-single";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { checkUserAuth } from "../../services/actions/AuthActions";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());    
    dispatch(checkUserAuth());
  }, []);

  const closeIngredientModal = () => {
    navigate(-1);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Menu />} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResPassword />}/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal onClose={closeIngredientModal} title={"Детали ингредиента"}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;