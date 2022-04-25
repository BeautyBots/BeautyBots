import React from 'react';
import { connect } from 'react-redux';
import { addReview } from '../store/review';
import { getOneProduct } from '../store/singleProduct';

class Review extends React.Component {
	constructor() {
		super();
		this.state = {
			body: '',
			productId: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			productId: this.props.match.params.productId,
		});
		this.props.loadProduct(this.props.match.params.productId);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.addReview(this.state);
		this.setState({
			body: '',
			productId: '',
		});
	}

	render() {
		const product = this.props.product;
		return (
			//need to pass in product id and user id
			<form id="add-review" onSubmit={this.handleSubmit}>
				<label>Product: {product.title}</label>
				<label htmlFor="body">Review:</label>
				<input
					type="text"
					name="body"
					value={this.body}
					onChange={this.handleChange}
				/>

				<button type="submit">Submit</button>
			</form>
		);
	}
}

const mapState = (state) => {
	return {
		product: state.product,
	};
};

//maybe need to dispatch getOneProduct so state persists
const mapDispatch = (dispatch, { history }) => {
	return {
		addReview: (review) => dispatch(addReview(review, history)),
		loadProduct: (productId) => dispatch(getOneProduct(productId)),
	};
};
export default connect(mapState, mapDispatch)(Review);
