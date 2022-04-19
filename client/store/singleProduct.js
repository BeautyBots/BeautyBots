import axios from "axios"

const GET_ONE_PRODUCT = "GET_ONE_PRODUCT"

const _getOneProduct = (product) => {
  return {
    type: GET_ONE_PRODUCT,
    product
  }
}

export const getOneProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${productId}`)
      dispatch(_getOneProduct(product))
    } catch (error) {
      console.error("Unable to get one product:", error)
    }
  }
}

const singleProductReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_ONE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProductReducer
