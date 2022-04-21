import axios from "axios";

const GET_CART = "GET_CART";

const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

export const getCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      let cart;
      if (!token) {
        cart = window.localStorage.getItem("cart");
      } else {
        const res = await axios.get(`/api/cart`, {
          headers: { authorization: token },
        });
        cart = res.data;
      }
      dispatch(_getCart(cart));
    } catch (error) {
      console.error("Unable to get cart: ", error);
    }
  };
};

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.post("/api/cart/addToCart", product, {
        headers: { authorization: token },
      });
      console.log("In AddToCART THUNK", res.data);
      dispatch(_getCart(res.data));
    } catch (error) {
      console.log("Unable to add to cart:", error);
    }
  };
};

export const removeFromCart = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.post("/api/cart/removeToCart", product, {
        headers: { authorization: token },
      });
      dispatch(_getCart(res.data));
    } catch (error) {
      console.log("Unable to remove from cart:", error);
    }
  };
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
