import axios from "axios";
import {
  GET_ERRORS,
  GET_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCTS
} from "./types";

export const addProduct = (product, history) => async dispatch => {
  try {
    await axios.post("/api/admin/products", product);
    history.push("/admin/dashboard/products/");

//  Clear the error object
    dispatch({
      type: GET_ERRORS,
      payload: {
        productVariations: {
          productColor: {},
          productSize: {},
          productQuantity: {}
        }
      }
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getProducts = () => async dispatch => {
  const res = await axios.get("/api/products/all");
  dispatch({
    type: GET_PRODUCTS,
    payload: res.data
  });
};

export const getProduct = (productId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch {
    history.push("/admin/dashboard/products");
  }
};

export const updateProduct = (product, history) => async dispatch => {
  try {
    await axios.put("/api/admin/products", product);
    history.push(`/admin/dashboard/products/${product.productId}`);

//  Clear the error object
    dispatch({
      type: GET_ERRORS,
      payload: {
        productVariations: {
          productColor: {},
          productSize: {},
          productQuantity: {}
        }
      }
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteProduct = (productId, history) => async dispatch => {
  if (window.confirm("Are you sure you want to delete the product ?")) {
    await axios.delete(`/api/admin/products/${productId}`);

    if (history) {
      history.push("/admin/dashboard/products");
    }

    dispatch({
      type: DELETE_PRODUCTS,
      payload: productId
    });
  }
};
