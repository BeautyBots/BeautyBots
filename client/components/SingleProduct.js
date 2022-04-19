import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOneProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.loadProduct(productId)
  }

  render() {
    const product = this.props.product

    return (
      <div className="product">
        <div className="product-row">
          <div className="product-img">
            <img src = {product.imageUrl} />
          </div>

          <div className="product-info">
            <h2>{product.title}</h2>
            <p>{product.price}</p>

            <p>Description: {product.description}</p>
            <p>Product Type: {product.category}</p>

          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({product}) => {
  return {
    product
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadProduct: (productId) => dispatch(getOneProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
