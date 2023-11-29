import styles from "./app.module.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
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

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
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
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal onClose={closeIngredientModal}>
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