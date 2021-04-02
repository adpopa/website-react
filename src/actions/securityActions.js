import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJwtToHeader from "../securityUtils/setJwtToHeader";
import jwt_decode from "jwt-decode";

export const login = LoginRequest => async dispatch => {
  try {
    // post Login Request
    const res = await axios.post("/api/credentials/login", LoginRequest);

    // extract the token from res.data
    const { token } = res.data;

    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);

    // set token in the headers ***
    setJwtToHeader(token);

    // decode token
    const decoded = jwt_decode(token);

    // dispatch to securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem("jwtToken");
  setJwtToHeader(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
