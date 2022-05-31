import { Elements, ElementsConsumer } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const stripePromise = loadStripe(
	'pk_test_51KsZPUFd3TraosqZxBMdHGmQbKf5AjdpppZwDNLsu1Q3Q57s1wb5oF13hUGJZZR6GNoa5wAhN5er3S4PTXErb8Lp00VAE88r2O'
);


export default class StripePaymentForm extends React.Component {
	render() {
		return (
			<Elements stripe={stripePromise}>
				<ElementsConsumer>{(ctx) => <PaymentForm {...ctx} />}</ElementsConsumer>
			</Elements>
		);
	}
}
