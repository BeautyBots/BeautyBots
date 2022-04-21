import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOneProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = { quantity: 1 };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.loadProduct(productId);
  }

  handleAddToCart(event) {
    // event.preventDefault();
    // const { id, title, price, imageUrl } = this.props.product;
    // let products = [];
    // if (localStorage.getItem("products")) {
    //   products = JSON.parse(localStorage.getItem("products"));
    // }
    // //check if product already exist in cart
    // const isFound = products.some((product) => product.id === id);
    // if (isFound) {
    //   //if exist, update product's quantity
    //   products = products.map((product) => {
    //     if (product.id !== id) {
    //       return product;
    //     } else {
    //       return {
    //         ...product,
    //         quantity: Number(product.quantity) + Number(this.state.quantity),
    //       };
    //     }
    //   });
    // } else {
    //   //if doesn't exist, push product to cart
    //   products.push({
    //     id,
    //     title,
    //     price,
    //     imageUrl,
    //     quantity: this.state.quantity,
    //   });
    // }
    // localStorage.setItem("products", JSON.stringify(products));
    // this.setState({ quantity: 1 });
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const product = this.props.product;
    console.log("Product OBJ", product);
    return (
      <div className="product">
        <Link to={`/products/${product.id}/editForm`}>
          <button>Edit Product</button>
        </Link>

        <div className="product-row">
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
      </div>
    );
  }
}

const mapState = ({ product }) => {
  return {
    product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProduct: (productId) => dispatch(getOneProduct(productId)),
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
