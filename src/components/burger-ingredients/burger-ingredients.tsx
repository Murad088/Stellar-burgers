import React from "react";
import { useMemo, useState } from 'react'
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "./ingredient"; 
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useInView } from 'react-intersection-observer';
import { closeIngredientDetailsModal, deletePopupIngredient, openIngredientDetailsModal, setPopupIngredient } from '../../services/actions/IngredientDetailsAction';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";


export const BurgerIngredients = () => {
  const data = useAppSelector((state) => {
    return state.ingredients.data;
  });
  const [current, setCurrent] = useState<'buns' | 'sauces' | 'main'>("buns");
  const { isPopupIngredientOpened } = useAppSelector(
    (state) => state.ingredientDetails
  );
  const dispatch = useAppDispatch();

  const buns = useMemo(() => {
    return data.filter((item) => item.type === 'bun');
  }, [data]);

 const handleOpenModalIngredient = (element: any) => {
    dispatch(openIngredientDetailsModal());
    dispatch(setPopupIngredient(element));
  };

  const handleCloseModalIngredient = () => {
    dispatch(closeIngredientDetailsModal());
    dispatch(deletePopupIngredient());
  };
  
  const sauces = useMemo(
    () => data.filter((item) => item.type === "sauce"),
    [data]
  );

  const main = useMemo(
    () => data.filter((item) => item.type === "main"),
    [data]
  );

  const setTab = (tab: "buns" | "sauces" | "main") => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    
    if (element) element.scrollIntoView({ behavior: "smooth"});
  };

  const [bunRef, bunInView] = useInView();
  const [sauceRef, sauceInView] = useInView();
  const [mainRef, mainInView] = useInView();

  return (
    data && (
      <>
        <h1 className={`${styles.title} text text_type_main-large mb-5`}>
          Соберите бургер
        </h1>
        <div className={styles.container}>
          <Tab
            value="buns"
            active={bunInView === true}
            onClick={() => {
              setTab("buns");
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={sauceInView === true}
            onClick={() => {
              setTab("sauces");
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={mainInView === true}
            onClick={() => {
              setTab("main");
            }}
          >
            Начинки
          </Tab>
        </div>
        <div className={styles.scroll}>
          <p
            id="buns"
            className={`${styles.title} text text_type_main-medium mt-10`}
          >
            Булки
          </p>
          <div className={styles.buns} ref={bunRef}>
            {buns.map((element) => (
              <Ingredient key={element._id} element={element} />
            ))}
          </div>
          <p
            id="sauces"
            className={`${styles.title} text text_type_main-medium mt-10 mb-6`}
          >
            Соусы
          </p>
          <div className={styles.sauces} ref={sauceRef}>
            {sauces.map((element) => (
              <Ingredient key={element._id} element={element} />
            ))}
          </div>
          <p
            id="main"
            className={`${styles.title} text text_type_main-medium mt-10 mb-6`}
          >
            Начинки
          </p>
          <div className={styles.mains} ref={mainRef}>
            {main.map((element) => (
              <Ingredient key={element._id} element={element}
              />
            ))}
          </div>
        </div>
        {isPopupIngredientOpened && (
          <Modal
            title="Детали ингредиента"
            onClose={() => {
              handleCloseModalIngredient();
            }}
          >
            <IngredientDetails />
          </Modal>
        )}
      </>
    )
  );
};