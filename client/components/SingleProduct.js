import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOneProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";
import { Button, Image } from "react-bootstrap";

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


        <div className="product-row">
          <div className="single-product-container polaroid">
            <div className="product-img">
              <img src={product.imageUrl} />
            </div>

            <div className="product-info">
              <h2 className="moontime display-2">{product.title}</h2>
              <h3 className="glacial">Price: ${product.price}</h3>

              <h4 className="glacial padding20">{product.description}</h4>
              <h6 className="glacial">Product Type: {product.category}</h6>
              {/* <form id="change-value">

							<input
								name="quantity"
								value={this.state.quantity}
								onChange={this.handleChange}
							/> */}

              <Button
                variant="outline-secondary"
                className="btn-lg padding20"
                onClick={() => this.props.addToCart(product)}
              >
                Add to Cart
              </Button>
              {/* </form> */}
              {isAdmin && (
                <Link to={`/products/${product.id}/editForm`}>
                  <button className="btn btn-outline-secondary btn-edit-product">
                    Edit Product
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="reviews-container">
            <h4 className="moontime display-4">reviews</h4>
            {reviews.map((review) => (
              <div key={review.id}>
                <p className="glacial display-5">{review.body}</p>
                <p className="glacial">{`By: ${review.user.username}`}</p>
              </div>
            ))}

            <Link to={`/products/${product.id}/addreview`}>
              <Button variant="outline-secondary">Write a review!</Button>
            </Link>
          </div>
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
