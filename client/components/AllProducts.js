import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFilteredProducts, getProducts } from '../store/products';

class AllProducts extends React.Component {
	constructor(props) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		this.props.loadProducts();
	}

	handleSelect(event) {
		event.target.value === 'all-products'
			? this.props.loadProducts()
			: this.props.filterProducts(event.target.value);
	}

	render() {
		const { products, isAdmin } = this.props;
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
			<div>
				{isAdmin && (
					<Link to="/products/addForm">
						<button>Add Product</button>
					</Link>
				)}
				<div className="product-filter">
					<h2>All Products</h2>
					<label className="filter">Filter: </label>
					<select onChange={this.handleSelect}>
						<option value="all-products">All Products</option>
						{categories.map((category, idx) => (
							<option key={idx} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div id="products">
					{products.map((product) => (
						<div key={product.id} id={product.id} className="product-link">
							<Link to={`/products/${product.id}`}>
								<img src={product.imageUrl} />
								<p>{product.title}</p>
								<p>{product.price}</p>
							</Link>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		products: state.products,
		isAdmin: state.auth.userType === 'Admin',
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadProducts: () => dispatch(getProducts()),
		filterProducts: (category) => dispatch(getFilteredProducts(category)),
	};
};

export default connect(mapState, mapDispatch)(AllProducts);
