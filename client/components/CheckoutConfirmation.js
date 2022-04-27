import React from "react";

const CheckoutConfirmation = (props) => {
  if (props.order.id) {
    return (
      <div className="confirmation">
        <h1>Thank you for your order!</h1>
        <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" />
        <h3>{`Your order number: ${props.order.id}`}</h3>
      </div>
    );
  } else {
    return (
      <div className="confirmation">
        <h1>Thank you for your order!</h1>
        <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" />
      </div>
    );
  }
};

export default CheckoutConfirmation;
