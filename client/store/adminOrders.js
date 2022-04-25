import axios from "axios";

const ADMIN_GET_ORDERS = "ADMIN_GET_ORDERS";

const _adminGetOrders = (orders) => {
  return {
    type: ADMIN_GET_ORDERS,
    orders
  }
}

export const getAdminOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await axios.get(`/api/orders`, {
        headers: { authorization: token },
      });
      dispatch(_adminGetOrders(res.data))
    } catch (error) {
      console.log("Unable to get all orders for Admin", error);
    }
  }
}

const adminOrderReducer = (state = [], action) => {
  switch (action.type) {
    case ADMIN_GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
};

export default adminOrderReducer;
