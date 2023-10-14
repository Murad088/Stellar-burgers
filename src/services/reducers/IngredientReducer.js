import {
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/IngredientAction";


const initialState = {
  showOrderModal: false,
  closeIngredient: null,
  loading: false,
  data: [],
  error: null,
};

export const IngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        loading: false,
        ingredientsFailed: true,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

