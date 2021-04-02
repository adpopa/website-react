import { GET_PRODUCTS, GET_PRODUCT, DELETE_PRODUCTS } from "../actions/types";

const initialState = {
  products: [],
  product: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };

    case DELETE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(
          product => product.productId !== action.payload
        )
      };

    default:
      return state;
  }
}
