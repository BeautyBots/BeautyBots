import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createOrder } from "../store/order";
import CheckoutConfirmation from "./CheckoutConfirmation";
import { Form, Button, Row } from "react-bootstrap";

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      shippingAddress: "",
      paid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }


  handleCheckout(email) {
		let cart = localStorage.getItem('cart');
		if (cart) {
			cart = JSON.parse(cart)
			cart.email = email
			this.props.createOrder(cart);
			//do we need to set localstorage cart to empty
		} else {
			cart = this.props.cart;
			this.props.createOrder(cart);
		}
	}

	async handleSubmit() {
		const { elements, stripe } = this.props;
		const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        address:this.state.shippingAddress,
        email:this.state.email,
        name:this.state.firstName,
      }
		});

		if (error) {
			console.log('[error]', error);
		} else {
			console.log('[PaymentMethod]', paymentMethod);
			const email = paymentMethod.billing_details.email
      this.setState({paid:true})
			this.handleCheckout(email)
		}
	}

  render() {
    const paid = this.state.paid;

    return (
      <>
        <div className="payment-page">
          {!paid ? (
            <div className="checkout-form">
              <h2>Checkout</h2>
              <Form>
                <Row className="row mb-3 justify-content-center">
                  <Form.Group controlId="formInput">
                    <Form.Label style={{ width: "100%" }}>
                      First Name
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      name="first-name"
                      placeholder="Enter first name"
                      onChange={this.handleChange}
                      value={this.firstName}
                    />
                  </Form.Group>
                </Row>
                <Row className="row mb-3 justify-content-center">
                  <Form.Group controlId="formInput">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      size="lg"
                      name="last-name"
                      placeholder="Enter last name"
                      onChange={this.handleChange}
                      value={this.lastName}
                    />
                  </Form.Group>
                </Row>
                <Row className="row mb-3 justify-content-center">
                  <Form.Group controlId="formInput">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      size="lg"
                      name="email"
                      placeholder="Enter email"
                      onChange={this.handleChange}
                      value={this.email}
                    />
                  </Form.Group>
                </Row>
                <Row className="row mb-3 justify-content-center">
                  <Form.Group controlId="formInput">
                    <Form.Label>Shipping Address</Form.Label>
                    <Form.Control
                      size="lg"
                      name="shipping"
                      placeholder="Enter shipping address"
                      onChange={this.handleChange}
                      value={this.shippingAddress}
                    />
                  </Form.Group>
                </Row>
              </Form>
              <div className="payment">
                <p>Payment</p>
                <CardElement className="payment-card" />
                <Button
                  className="payment-btn"
                  variant="outline-secondary"
                  onClick={this.handleSubmit}
                >
                  Buy
                </Button>
              </div>
            </div>
          ) : (
            <CheckoutConfirmation order={this.props.cart} />
          )}
        </div>
      </>
    );
  }
}

const mapState = ({ cart }) => {
  return { cart };
};

const mapDispatch = (dispatch) => {
  return {
    createOrder: (cart) => dispatch(createOrder(cart)),
  };
};

export default connect(mapState, mapDispatch)(PaymentForm);
