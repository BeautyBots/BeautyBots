import React from "react";
import { connect } from "react-redux";
import { addReview } from "../store/review";
import { getOneProduct } from "../store/singleProduct";
import { Form } from "react-bootstrap";

class Review extends React.Component {
  constructor() {
    super();
    this.state = {
      body: "",
      productId: "",
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
      body: "",
      productId: "",
    });
  }

  render() {
    const { product, username } = this.props;
    return (
      <>
        <Form className="add-review-form" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label>Product</Form.Label>
            <Form.Control
              className="review-form-product "
              type="text"
              placeholder={product.title}
              aria-label="Disabled input example"
              disabled
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="review-form-product"
              type="text"
              placeholder={username}
              aria-label="Disabled input example"
              disabled
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Review</Form.Label>
						<Form.Text id="passwordHelpBlock" muted>
							Your review must be between 30 - 500 characters
						</Form.Text>
            <Form.Control
							type="text"
							name="body"
							value={this.body}
							onChange={this.handleChange}
              as="textarea"
              rows={10}
            />
          </Form.Group>

          <button
            type="submit"
            className="btn btn-outline-secondary review-btn"
          >
            Submit Review
          </button>
        </Form>
      </>

    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    username: state.auth.username,
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
