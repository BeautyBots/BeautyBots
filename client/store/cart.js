import axios from "axios";

const GET_CART = "GET_CART";
const EMPTY_CART = "EMPTY_CART"

const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

export const _emptyCart = () => {
  return {
    type: EMPTY_CART
  }
}

export const getCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      let cart;
      if (!token) {
        cart = JSON.parse(window.localStorage.getItem("cart"));
        console.log("getCart cart", cart);

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
      console.log("token", token);
      if(!token){
        console.log("in the not token");
        if(!window.localStorage.getItem("cart")){
        let cart = {"lineItems": [{productId: product.id, quantity: 1, product: product}] }
        window.localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          console.log("over here");
          let cart = JSON.parse(window.localStorage.getItem("cart"));
          console.log("cart", cart);
          const isFound = cart.lineItems.some((item) => item.productId === product.id);
          console.log("isFound", isFound);
          if(isFound){
            console.log("lineItems", cart.lineItems);
            cart.lineItems = cart.lineItems.map((item) => {
              if(item.productId !== product.id){
                return item;
              } else {
                let quantity = Number(item.quantity)
                console.log(quantity);
                return {
                  ...item,
                  quantity: quantity + 1
                }
              }
            })
          } else {
            cart.lineItems.push({productId: product.id, quantity: 1, product});
          }
          window.localStorage.setItem("cart", JSON.stringify(cart));
          dispatch(_getCart(cart))
        }
      } else {
        const res = await axios.post("/api/cart/addToCart", product, {
          headers: { authorization: token },
        });
        console.log("In AddToCART THUNK", res.data);
        dispatch(_getCart(res.data));

      }
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
    case EMPTY_CART:
      return {}
    default:
      return state;
  }
};

export default cartReducer;
