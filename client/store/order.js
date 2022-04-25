import axios from "axios";

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
      } else {
        cart = JSON.parse(cart);
        cart.status = "Pending";
        const res = await axios.post("/api/cart/createOrderGuest", cart);
        let order = res.data;
        dispatch(_createOrder(order));
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
