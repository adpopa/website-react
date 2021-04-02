import axios from "axios";
import { ADD_TO_CART, SET_CART, ADDRESS_TO_CART, GET_ERRORS, GET_ORDER_CONFIRMATION, } from "./types"

export const addToCart = (item) => async dispatch => {
    dispatch ({
        type: ADD_TO_CART,
        payload: item
    })
}

export const updateCart = (cart) => async dispatch => {
    dispatch ({
      type: SET_CART,
      payload: cart
    })
}

export const addressToCart = (address) => async dispatch => {
  dispatch ({
    type: ADDRESS_TO_CART,
    payload: address
  })
}

export const sendOrder = (cart, history) => async dispatch => {
    try {

        const res = await axios.post("/api/user/orders", cart);
        localStorage.removeItem("cart");
        history.push("/buy/confirmation")

        dispatch({
            type: GET_ORDER_CONFIRMATION,
            payload: res.data
          });
    } catch (error) {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      }
}