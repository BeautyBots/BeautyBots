import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const FILTER_PRODUCTS = "FILTER_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT"

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

const _deleteProduct = (productToDelete) => {
  return {
    type: DELETE_PRODUCT,
    productToDelete
  }
}


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

export const deleteProduct  = (productId, history) => {
  return async (dispatch) => {
    try {
      const { data: productToDelete} = await axios.delete(`/api/products/${productId}`)
      dispatch(_deleteProduct(productToDelete))
      history.push('/products')
    } catch (error) {
      console.error("Unable to delete product:", error)
    }
  }
}


const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case FILTER_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.newProduct];
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.productToDelete.id)
    default:
      return state;
  }
};

export default productsReducer;
