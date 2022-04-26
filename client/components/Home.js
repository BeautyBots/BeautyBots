import React from "react";
import { connect } from "react-redux";
import { Carousel } from "react-bootstrap";

//COMPONENT
export const Home = (props) => {
  let { username } = props;
  if (!username) {
    username = "Guest"
  }
  const name = username[0].toUpperCase() + username.slice(1);

  return (
    <div>
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
    </div>
  );
};

//CONTAINER
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
