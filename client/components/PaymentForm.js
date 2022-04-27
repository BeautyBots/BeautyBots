import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { connect } from "react-redux"
import { createOrder } from "../store/order"
import CheckoutConfirmation from "./CheckoutConfirmation"


class PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email:'',
      shippingAddress:'',
      paid:false
    }
		this.handleChange = this.handleChange.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
			type: 'card',
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
    const paid = this.state.paid

		return (
			<>
      {!paid ?
      <div>
      <form>
        <label htmlFor="first-name">First Name:</label>
				<input name="first-name" onChange={this.handleChange} value={this.firstName} />

        <label htmlFor="last-name">Last Name:</label>
				<input name="last-name" onChange={this.handleChange} value={this.lastName} />

        <label htmlFor="email">Email:</label>
				<input name="email" onChange={this.handleChange} value={this.email} />

        <label htmlFor="shipping">Shipping Address:</label>
				<input name="shipping" onChange={this.handleChange} value={this.shippingAddress} />

      </form>
				<p>Payment</p>
				<CardElement />
				<button onClick={this.handleSubmit}>Buy</button>
        </div>


      : <CheckoutConfirmation />

      }
			</>
		);
	}
}

const mapState = ({cart}) => {
  return {cart}
}

const mapDispatch = (dispatch) => {
  return {
  createOrder: (cart) => dispatch(createOrder(cart))
  }
}

export default connect(mapState, mapDispatch)(PaymentForm)
