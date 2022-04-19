import React from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from '../store/products';

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const {products} = this.props

    return (
      <div>
        <div className="product-filter">
          <h2>All Products</h2>
          <label className="filter">Filter: </label>
              <select onChange = {this.handleSelect}>
                <option value="all-products" >All Products</option>
                <option value="toner">Toner</option>
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
    )
  }
}

const mapState = ({products}) => {
  return {
    products
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(getProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
