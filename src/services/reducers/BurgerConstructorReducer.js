import update from "immutability-helper";
import {
  ADD_BURGER_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_BURGER_INGREDIENT,
} from "../actions/BurgerConstructorAction";

const initialState = {
  bun: undefined,
  ingredients: [],
};

export const BurgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      if (action.ingredient.type === "bun") {
        return { ...state, bun: action.ingredient };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    }
    case REMOVE_BURGER_INGREDIENT: {
      const newIngredients = state.ingredients.filter(
        (item) => item.key !== action.key   
      );

      return {
        ...state,
        ingredients: newIngredients,
      };
    }

    default:
      return state;
  }
};