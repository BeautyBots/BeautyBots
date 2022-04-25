import React from 'react';
import {
	Elements,
	ElementsConsumer,
	CardElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
	'pk_test_51KsZPUFd3TraosqZxBMdHGmQbKf5AjdpppZwDNLsu1Q3Q57s1wb5oF13hUGJZZR6GNoa5wAhN5er3S4PTXErb8Lp00VAE88r2O'
);

class PaymentForm extends React.Component {
	async handleSubmit() {
		const { elements, stripe } = this.props;
		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			console.log('[error]', error);
		} else {
			console.log('[PaymentMethod]', paymentMethod);
			// ... SEND to your API server to process payment intent
		}
	}

	render() {
		return (
			<>
				<h1>stripe form</h1>
				<CardElement />
				<button onClick={this.handleSubmit}>Buy</button>
			</>
		);
	}
}

export default class StripePaymentForm extends React.Component {
	render() {
		return (
			<Elements stripe={stripePromise}>
				<ElementsConsumer>{(ctx) => <PaymentForm {...ctx} />}</ElementsConsumer>
			</Elements>
		);
	}
}
