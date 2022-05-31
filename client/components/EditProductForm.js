import React from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../store/singleProduct';
import { deleteProduct } from '../store/products';
import { Button } from 'react-bootstrap';

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
						<Button size="sm" variant="outline-secondary" type="submit">
							Submit
						</Button>
						<Button
							variant="outline-danger"
							size="sm"
							onClick={() => {
								this.props.deleteProduct(this.props.product.id);
							}}
						>
							Delete Product
						</Button>
					</div>
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
