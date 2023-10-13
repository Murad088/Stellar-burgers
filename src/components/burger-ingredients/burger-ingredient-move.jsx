import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { removeBurgerIngredient } from "../../services/actions/BurgerConstructorAction";

export const BurgerIngredientMove = ({ ingredient, moveIngredientItem }) => {
  const ingredients = useSelector((state) => state.burger.ingredients);


  const id = ingredient.key;
  const index = ingredients.indexOf(ingredient);

  const dispatch = useDispatch();


  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;


  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      if (!ReferenceError.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      moveIngredientItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });


  const ref = useRef(null);
  const dragDropRef = drag(drop(ref));

  return (
    <div
      className={`${styles.move} pl-2`}
      data-handler-id={handlerId}
      ref={dragDropRef}
      style={{ opacity }}
    >
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeBurgerIngredient(ingredient.key))}
      />
    </div>
  );
};


BurgerIngredientMove.propTypes = {
  ingredient: ingredientPropType.isRequired,
};