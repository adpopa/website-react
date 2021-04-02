
import { ADD_TO_CART, SET_CART, ADDRESS_TO_CART, GET_ORDER_CONFIRMATION } from "../actions/types"

const initialState = {
    confirmation: "",
    items:[],
    total: 0,
    "address": {
        "name": "",
        "phone": "",
        "adress1": "",
        "city": "",
        "postcode": "",
        "country": ""
    }
}

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_CART: {
            localStorage.setItem("cart", JSON.stringify(action.payload));
            
            return {
                ...state,
                items: action.payload.items,
                total: action.payload.total,
                expiration: action.payload.expiration
            }
        }

        case ADD_TO_CART: {
            let addedItem = action.payload;
            let itemInCart = state.items.find( item => addedItem.variationId === item.variationId)

            if(!state.expiration) {
                //expiry date
                var date = new Date();
                date.setDate(date.getDate() + 30);
                state.expiration = date;
            }

            // CASE if item is already in cart
            if(itemInCart) {
                itemInCart.itemQuantity += parseInt(addedItem.itemQuantity)
                
                let newState = {...state};
                let newTotal;

                //limit max number of items in cart to 10
                if(itemInCart.itemQuantity <= 10) {
                    //calculating the total
                    newTotal = Number(Math.round(state.total + addedItem.itemPrice * addedItem.itemQuantity + "e+2")  + "e-2")
                    
                    newState = {
                        ...state,
                        total: newTotal
                    };
                } else {
                    itemInCart.itemQuantity = 10;
                }

                //store cart in local storage
                localStorage.setItem("cart", JSON.stringify(newState));

                return newState;
            }
            
            // CASE if item is not in cart
            else {
                addedItem.itemQuantity = parseInt(addedItem.itemQuantity)

                //calculating the total
                let newTotal = Number(Math.round(state.total + addedItem.itemPrice * addedItem.itemQuantity + "e+2")  + "e-2")

                let newState = {
                    ...state,
                    items: [...state.items, addedItem],
                    total: newTotal
                };

                //store cart in local storage
                localStorage.setItem("cart", JSON.stringify(newState));

                return newState;
            }
        }

        case ADDRESS_TO_CART: {
            return {
                ...state,
                address: action.payload
            }
        }

        case GET_ORDER_CONFIRMATION: {
            return {
                confirmation: action.payload
            }
        }

        default: 
            return state;
    }
}