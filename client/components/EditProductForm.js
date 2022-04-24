import React from "react";
import { connect } from "react-redux";
import { updateProduct } from "../store/singleProduct";
import { deleteProduct } from "../store/products";

class EditProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.product.title || "",
      price: props.product.price || "",
      description: props.product.description || "",
      quantity: props.product.quantity || "",
      category: props.product.category || "",
      imageUrl: props.product.imageUrl || "",
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
      if (this.state[key] !== "") {
        passToDispatch[key] = this.state[key];
      }
    }
    this.props.updateProduct({ ...this.props.product, ...passToDispatch });
    this.setState({
      title: "",
      price: "",
      description: "",
      quantity: "",
      category: "",
      imageUrl: "",
    });
  }

  render() {
    const { title, price, description, quantity, category, imageUrl } =
      this.state;
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
      <div id="edit-product-form">
        <form id="add-product-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Product Name:</label>
          <input name="title" onChange={this.handleChange} value={title} />

          <label htmlFor="price">Price:</label>
          <input name="price" onChange={this.handleChange} value={price} />

          <label htmlFor="description">Description:</label>
          <input
            name="description"
            onChange={this.handleChange}
            value={description}
          />

          <label htmlFor="quantity">Quantity:</label>
          <input
            name="quantity"
            onChange={this.handleChange}
            value={quantity}
          />

          <label className="category">Category: </label>
          <select name="category" onChange={this.handleChange} value={category}>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>

          <label htmlFor="imageUrl">imageUrl:</label>
          <input
            name="imageUrl"
            onChange={this.handleChange}
            value={imageUrl}
          />

          <button type="submit">Submit</button>
        </form>

        <button
          onClick={() => {
            this.props.deleteProduct(this.props.product.id);
          }}
        >
          Delete Product
        </button>
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
