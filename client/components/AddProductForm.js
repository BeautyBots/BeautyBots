import React from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store/products';
import { Button } from 'react-bootstrap';

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
			<div className="product-forms">
				<form className="add-product-form" onSubmit={this.handleSubmit}>
					<h1>Add New Product: </h1>

					<div className="elements">
						<div className="short-element">
							<label htmlFor="title">Product Name:</label>
							<input
								type="text"
								name="title"
								onChange={this.handleChange}
								value={title}
							/>
						</div>

						<div className="short-element">
							<label htmlFor="price">Price:</label>
							<input
								type="text"
								name="price"
								onChange={this.handleChange}
								value={price}
							/>
						</div>
					</div>

					<div className="elements">
						<div className="short-element">
							<label htmlFor="quantity">Quantity:</label>
							<input
								type="text"
								name="quantity"
								onChange={this.handleChange}
								value={quantity}
							/>
						</div>

						<div className="short-element">
							<label className="category">Category: </label>
							<select
								name="category"
								onChange={this.handleChange}
								value={category}
							>
								<option>Select Category</option>
								{categories.map((category, idx) => (
									<option key={idx} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="elements">
						<div className="long-element">
							<label htmlFor="description">Description:</label>
							<textarea
								type="text"
								name="description"
								onChange={this.handleChange}
								value={description}
							>
								{`${this.state.description}`}
							</textarea>
						</div>
					</div>

					<div className="elements">
						<div className="long-element">
							<label htmlFor="imageUrl">Image Url:</label>
							<input
								type="text"
								name="imageUrl"
								onChange={this.handleChange}
								value={imageUrl}
							/>
						</div>
					</div>

					<div className="elements">
						<Button variant="outline-secondary" size="sm" type="submit">
							Submit
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => ({
	addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatch)(AddProductForm);
