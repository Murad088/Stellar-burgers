import React from 'react';
import { DndProvider } from 'react-dnd';
import styles from './menu.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

const Menu = () => {
  return (
    <main className={`${styles.main} ${styles.columns}`}>
      <DndProvider backend={HTML5Backend}>
        <section className={`${styles.column} ${styles.columns}`}>
          <div className={`${styles.article} ${styles.first__article}`}>
            <BurgerIngredients />
          </div>
        </section>
        <BurgerConstructor />
      </DndProvider>
    </main>  
  );
};

export default Menu