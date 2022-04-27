import React from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../store/singleProduct';
import { deleteProduct } from '../store/products';

class EditProductForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.product.title || '',
			price: props.product.price || '',
			description: props.product.description || '',
			quantity: props.product.quantity || '',
			category: props.product.category || '',
			imageUrl: props.product.imageUrl || '',
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
		event.preventDefault();
		let passToDispatch = {};
		for (let key in this.state) {
			if (this.state[key] !== '') {
				passToDispatch[key] = this.state[key];
			}
		}
		this.props.updateProduct({ ...this.props.product, ...passToDispatch });
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
					<h1>Edit Product: </h1>

					<div className="elements">
						<div className="short-element">
							<label htmlFor="title">Product Name:</label>
							<input name="title" onChange={this.handleChange} value={title} />
						</div>

						<div className="short-element">
							<label htmlFor="price">Price:</label>
							<input name="price" onChange={this.handleChange} value={price} />
						</div>
					</div>

					<div className="elements">
						<div className="short-element">
							<label htmlFor="quantity">Quantity:</label>
							<input
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
								{categories.map((category) => (
									<option value={category}>{category}</option>
								))}
							</select>
						</div>
					</div>

					<div className="elements">
						<div className="long-element">
							<label htmlFor="description">Description:</label>
							<textarea
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
								name="imageUrl"
								onChange={this.handleChange}
								value={imageUrl}
							/>
						</div>
					</div>

					<button type="submit">Submit</button>
					<button
						onClick={() => {
							this.props.deleteProduct(this.props.product.id);
						}}
					>
						Delete Product
					</button>
				</form>
			</div>
		);
	}
}

const mapState = ({ product }) => {
	return {
		product,
	};
};

const mapDispatch = (dispatch, { history }) => ({
	updateProduct: (product) => dispatch(updateProduct(product)),
	deleteProduct: (product) => dispatch(deleteProduct(product, history)),
});

export default connect(mapState, mapDispatch)(EditProductForm);
