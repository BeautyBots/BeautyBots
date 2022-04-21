import React from "react";
import { connect } from "react-redux";
import { getCart, removeFromCart } from "../store/cart";

class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("this.props in CDM", this.props);
  }

  render() {
    // const products = JSON.parse(localStorage.getItem('products'));
    console.log("in render", this.props);
    const lineItem = this.props.cart.lineItems;
    if (!lineItem) {
      return <h1>Your cart is empty! buy something pls..</h1>;
    } else {
      return (
        <div>
          {lineItem.map((currentItem) => (
            <div key={currentItem.product.id}>
              <img src={`${currentItem.product.imageUrl}`} />
              <p>{currentItem.product.title}</p>
              <p>{currentItem.quantity}</p>
              <button
                onClick={() => this.props.removeFromCart(currentItem.product)}
              >
                {" "}
                -{" "}
              </button>
              <p>{currentItem.product.price}</p>
            </div>
          ))}
          <button>Checkout</button>
        </div>
      );
    }
  }
}

const mapState = ({ cart }) => {
  return { cart }; //object
};

const mapDispatch = (dispatch) => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
