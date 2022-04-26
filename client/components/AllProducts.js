import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getFilteredProducts, getProducts } from "../store/products";
import { addToCart } from "../store/cart";
import { Row, Col, Card } from "react-bootstrap";

class AllProducts extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  handleSelect(event) {
    event.target.value === "all-products"
      ? this.props.loadProducts()
      : this.props.filterProducts(event.target.value);
  }

  render() {
    const { products, isAdmin } = this.props;
    const categories = [
      "Toner",
      "Cleanser",
      "Exfoliator",
      "Mask",
      "Moisturizer",
      "Sun Protection",
      "Treatments",
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
        <Row xs={1} md={3} className="g-4">
          {products.map((product) => (
            <Col key={product.id} className="col-sm-4 py-2">
              <Card className="card h-100">
                <Link to={`/products/${product.id}`}>
                  <Card.Img variant="top" src={product.imageUrl} />
                </Link>
                <Card.Body>
                  <Link to={`/products/${product.id}`}>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                  </Link>
                  <button onClick={() => this.props.addToCart(product)}>
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* <div id="products">
          {products.map((product) => (
            <div key={product.id} id={product.id} className="product-link">
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </Link>
              <button onClick={() => this.props.addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div> */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    product: state.product,
    isAdmin: state.auth.userType === "Admin",
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(getProducts()),
    filterProducts: (category) => dispatch(getFilteredProducts(category)),
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
