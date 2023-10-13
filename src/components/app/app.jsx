import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { fetchIngredients } from "../../services/actions/IngredientAction";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
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
    </div>
  );
}

export default App;