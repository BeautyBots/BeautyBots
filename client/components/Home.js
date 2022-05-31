import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Button, Row, Col, Card } from "react-bootstrap";

//COMPONENT
export const Home = (props) => {
  let { username } = props;
  if (!username) {
    username = "Guest"
  }
  const name = username[0].toUpperCase() + username.slice(1);
  const products = props.products.slice(0,3)

  return (
    <div className="homepage">
      <Carousel fade>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://www.eisenberg.com/upload/images/eisenberg/11/952_BANNER-CATEGORIE-BESOIN-1170X500PX-LG_ENG.jpeg"
            alt="First slide"
            style={{ height: "500px" }}
          />
          <Carousel.Caption>
            <h3>Welcome, {name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://www.etonline.com/sites/default/files/styles/max_970x546/public/images/2022-04/sephora.jpeg?h=734e4058&itok=anRHGooh"
            alt="Second slide"
            style={{ height: "500px" }}
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/skincare-1588698347.png?crop=1.00xw:0.752xh;0,0.175xh&resize=1200:*"
            alt="Third slide"
            style={{ height: "500px" }}
          />
        </Carousel.Item>
      </Carousel>

      <div className="row justify-content-center all-product-button">
        <Link to="/products" >
          <button type="button" className="btn btn-outline-secondary">ALL PRODUCTS</button>
        </Link>
      </div>

      <h3 className="featured-heading">FEATURED PRODUCTS</h3>
      <Row xs={1} md={3} className="g-4 home-row">
          {products.map((product) => (
            <Col key={product.id} className="col-sm-4 py-2 home-col">
              <Card className="card h-100 home-card">
                <Link to={`/products/${product.id}`}>
                  <Card.Img variant="top" src={product.imageUrl} />
                </Link>
                <Card.Body className = "text-center">
                  <Link to={`/products/${product.id}`}>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

    </div>
  );
};

//CONTAINER
const mapState = (state) => {
  return {
    username: state.auth.username,
    products: state.products
  };
};

export default connect(mapState)(Home);
