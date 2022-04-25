import axios from "axios";

const ADD_REVIEW = "ADD_REVIEW";

const _addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

export const addReview = (review,history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data: newReview } = await axios.post("/api/reviews", review, {
        headers: { authorization: token },
      });
      dispatch(_addReview(newReview));
      history.push(`/products/${review.productId}`);
    } catch (error) {
      console.error("Unable to add review:", error);
    }
  };
};

const reviewsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
};

export default reviewsReducer;
