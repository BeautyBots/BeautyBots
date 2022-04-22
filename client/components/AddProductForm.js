import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../store/products';

class AddProductForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			price: '',
			description: '',
			quantity: '',
			category: '',
			imageUrl: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		//change this to use a reduce method for a more elegant solution
		event.preventDefault();
		let passToDispatch = {};
		// const passToDispatch = Object.keys(this.state).reduce((obj, key) => ({
		// 	...obj,
		// 	...(this.state[key] && { key: this.state[key] }),
		// }));
		for (let key in this.state) {
			if (this.state[key] !== '') {
				passToDispatch[key] = this.state[key];
			}
		}
		this.props.addProduct(passToDispatch);
		this.setState({
			title: '',
			price: '',
			description: '',
			quantity: '',
			category: '',
			imageUrl: '',
		});
	}

	render() {
		const { title, price, description, quantity, category, imageUrl } =
			this.state;
		const categories = [
			'Toner',
			'Cleanser',
			'Exfoliator',
			'Mask',
			'Moisturizer',
			'Sun Protection',
			'Treatments',
		];
		return (
			<form id="add-product-form" onSubmit={this.handleSubmit}>
				<label htmlFor="title">Product Name:</label>
				<input name="title" onChange={this.handleChange} value={title} />

				<label htmlFor="price">Price:</label>
				<input name="price" onChange={this.handleChange} value={price} />

				<label htmlFor="description">Description:</label>
				<input
					name="description"
					onChange={this.handleChange}
					value={description}
				/>

				<label htmlFor="quantity">Quantity:</label>
				<input name="quantity" onChange={this.handleChange} value={quantity} />

				<label className="category">Category: </label>
				<select name="category" onChange={this.handleChange} value={category}>
					<option>Select Category</option>
					{categories.map((category, idx) => (
						<option key={idx} value={category}>
							{category}
						</option>
					))}
				</select>

				<label htmlFor="imageUrl">imageUrl:</label>
				<input name="imageUrl" onChange={this.handleChange} value={imageUrl} />

				<button type="submit">Submit</button>
			</form>
		);
	}
}

const mapDispatch = (dispatch) => ({
	addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatch)(AddProductForm);
