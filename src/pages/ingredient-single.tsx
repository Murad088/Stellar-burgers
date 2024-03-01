import React from 'react';import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from './styles.module.css';

export function IngredientPage() {
  return (
    <div className={styles.ingredient}>
      <IngredientDetails />
    </div>
  )
}