import React from "react";
import { connect } from "react-redux";
import { addToCart, getCart, removeFromCart } from "../store/cart";
import { createOrder } from "../store/order";

class Cart extends React.Component {
  constructor() {
    super();
  }

  render() {
    const lineItems = this.props.cart.lineItems;
    if (!lineItems) {
      return <h1>Your cart is empty! buy something pls..</h1>;
    } else {
      return (
        <div>
          {lineItems.map((item) => (
            <div key={item.product.id}>
              <img src={`${item.product.imageUrl}`} />
              <p>{item.product.title}</p>
              <button onClick={() => this.props.removeFromCart(item.product)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => this.props.addToCart(item.product)}>
                +
              </button>
              <p>{item.product.price}</p>
            </div>
          ))}
          <button onClick={() => this.props.createOrder(this.props.cart)}>
            Checkout
          </button>
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
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    getCart: () => dispatch(getCart()),
    createOrder: (cart) => dispatch(createOrder(cart)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
