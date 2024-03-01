import { combineReducers } from "redux";
import { IngredientsReducer } from "./IngredientReducer";
import { IngredientDetailsReducer } from "./IngredientDetailsReducer";
import { BurgerConstructorReducer } from "./BurgerConstructorReducer";
import { orderDetailsReducer } from "./OrderDetailsReducer";
import { authReducer } from "./AuthReducer";
import { wsReducer } from "./WebsocketReducer";


export const RootReducer = combineReducers({
  ingredients: IngredientsReducer,
  ingredientDetails: IngredientDetailsReducer,
  burger: BurgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  authReducer: authReducer,
  wsReducer: wsReducer,
});