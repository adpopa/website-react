import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import productReducer from "./productReducer";
import securityReducer from "./securityReducer";
import cartReducer from "./cartReducer";

export default combineReducers ({
    errors: errorsReducer,
    product: productReducer,
    security: securityReducer,
    cart: cartReducer
});