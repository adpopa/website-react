import axios from "axios";
import { GET_ERRORS } from "./types";

export const addUser = (user, history) => async dispatch => {
  try {
    await axios.post("/api/credentials/register", user);
    history.push("/login");
    /*
     * Clear the error object
     */
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
