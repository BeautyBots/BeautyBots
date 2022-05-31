import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  getCart,
  removeFromCart,
  removeProduct,
} from "../store/cart";
import { Button, Card, Row, Col } from "react-bootstrap";

class Cart extends React.Component {
  constructor() {
    super();
  }

  render() {
    const lineItems = this.props.cart.lineItems || [];
    if (lineItems.length === 0) {
      return (
        <div className="empty-cart">
          <img src="/productImages/shopping_cart.png" />
          <h1>Your Cart is Empty</h1>
          <Button variant="outline-secondary" className="cont-shopping-btn">
            <Link to="/products">
              <div className="cont-shopping">Continue Shopping</div>
            </Link>
          </Button>
        </div>
      );
    } else {
      return (
        <div className="cart-page">
          <h1>Your Current Cart:</h1>

          {lineItems.map((item) => (
            <div className="cart-items" key={item.product.id}>
              <Card className="card flex-row" style={{ width: "50rem" }}>
                <Row className="row g-0">
                  <Col className="col-sm-4">
                    <Card.Img
                      className="card-img-top h-100"
                      src={`${item.product.imageUrl}`}
                    />
                  </Col>
                  <Col className="col-sm-8">
                    <Card.Body>
                      <Card.Title bsPrefix="card-title-cart">
                        {item.product.title}
                      </Card.Title>
                      <div className="toggle-quantity">
                        <Button
                          variant="outline-secondary"
                          onClick={() =>
                            this.props.removeFromCart(item.product)
                          }
                        >
                          -
                        </Button>
                        <span style={{ color: "rgb(104, 100, 100)" }}>
                          {" "}
                          {item.quantity}{" "}
                        </span>
                        <Button
                          className="plus-btn"
                          variant="outline-secondary"
                          onClick={() => this.props.addToCart(item.product)}
                        >
                          +
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => this.props.removeProduct(item.product)}
                        >
                          Remove
                        </Button>
                      </div>
                      <Card.Text bsPrefix="card-text-cart">
                        ${item.product.price * item.quantity}.00
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
          <div>
            <span>TOTAL: ${this.props.cart.total}.00 </span>
          </div>
          <Link to="/checkout">
            <Button className="checkout-btn" variant="outline-secondary">
              <div className="checkout">Checkout</div>
            </Button>
          </Link>
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
    getCart: () => dispatch(getCart()),
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    removeProduct: (product) => dispatch(removeProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
