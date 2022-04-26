import axios from "axios";
import {_getCart} from "./cart"

const CREATE_ORDER = "CREATE_ORDER";

const _createOrder = (order) => {
  return {
    type: CREATE_ORDER,
    order,
  };
};


export const createOrder = (cart) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const res = await axios.post("/api/cart/createOrder", cart, {
          headers: { authorization: token },
        });
        let order = res.data;
        dispatch(_createOrder(order));
        dispatch(_getCart(order))
      } else {
        cart = JSON.parse(cart);
        cart.status = "Pending";
        const res = await axios.post("/api/cart/createOrderGuest", cart);
        let order = res.data;
        dispatch(_createOrder(order));
        window.localStorage.setItem("cart",JSON.stringify({"lineItems":[]}))
        const emptyCart = JSON.parse(window.localStorage.getItem("cart"))
        dispatch(_getCart(emptyCart))

      }
    } catch (error) {
      console.log("Unable to create order:", error);
    }
  };
};


//REDUCER
const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order;
    default:
      return state;
  }
};

export default orderReducer;
