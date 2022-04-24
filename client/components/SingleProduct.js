import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOneProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = { quantity: 1 };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.loadProduct(productId);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const product = this.props.product;
    const reviews = product.reviews || [];
    const isAdmin = this.props.isAdmin;
    
    return (
       <div className="product">
        {isAdmin && (
          <Link to={`/products/${product.id}/editForm`}>
            <button>Edit Product</button>
          </Link>
        )}

        <div className="product-row">
          <div className="single-product-container">
            <div className="product-img">
              <img src={product.imageUrl} />
            </div>

            <div className="product-info">
              <h2>{product.title}</h2>
              <p>Price: {product.price}</p>

              <p>Description: {product.description}</p>
              <p>Product Type: {product.category}</p>
              {/* <form id="change-value">

							<input
								name="quantity"
								value={this.state.quantity}
								onChange={this.handleChange}
							/> */}

              <button onClick={() => this.props.addToCart(product)}>
                Add to Cart
              </button>
              {/* </form> */}
            </div>
            </div>
            <h4>Reviews</h4>
            {reviews.map((review) => (
              <div key={review.id}>
                <p>{review.body}</p>
              </div>
            ))}

        </div>
      </div>
    );
  }
}



const mapState = (state) => {
  return {
    product: state.product,
    isAdmin: state.auth.userType === "Admin",
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProduct: (productId) => dispatch(getOneProduct(productId)),
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
