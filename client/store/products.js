import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const FILTER_PRODUCTS = "FILTER_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const _filterProducts = (products) => {
  return {
    type: FILTER_PRODUCTS,
    products,
  };
};

const _addProduct = (newProduct) => {
  return {
    type: ADD_PRODUCT,
    newProduct,
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(_getProducts(products));
    } catch (error) {
      console.error("Unable to get products list:", error);
    }
  };
};

export const getFilteredProducts = (category) => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      const filteredProducts = products.filter(
        (product) => product.category === category
      );
      dispatch(_filterProducts(filteredProducts));
    } catch (error) {
      console.error("Unable to filter products list:", error);
    }
  };
};

export const addProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      const { data: newData } = await axios.post("/api/products", newProduct);
      dispatch(_addProduct(newData));
    } catch (error) {
      console.error("Unable to add new product:", error);
    }
  };
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case FILTER_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.newProduct];
    default:
      return state;
  }
};

export default productsReducer;
