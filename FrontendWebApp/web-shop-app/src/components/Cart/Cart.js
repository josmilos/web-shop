import React, { useContext } from "react";
import Modal from "./Modal";
import { Button } from "@mui/material";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  console.log(cartCtx.products)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.products.length > 0;

  const cartProductRemoveHandler = (productId) => {};
  const cartProductAddHandler = (product) => {};

  const cartItems = (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {cartCtx.products.map((product) => (
        <CartItem
          key={product.productId}
          name={product.name}
          quantity={product.quantity}
          price={product.price}
          onRemove={cartProductRemoveHandler.bind(null, product.productId)}
          onAdd={cartProductAddHandler(null, product)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          margin: "1rem 0",
        }}
      >
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Button
          variant="outlined"
          style={{
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "1px solid #16273E",
            padding: "0.35rem 2rem",
            borderRadius: "25px",
            marginLeft: "1rem",
            color: "#233B58",
          }}
          onClick={props.onClose}
        >
          Close
        </Button>
        {hasItems && (
          <Button
            variant="contained"
            style={{
              cursor: "pointer",
              backgroundColor: "#3D70B2",
              color: "white",
              padding: "0.7rem 2.5rem",
              borderRadius: "25px",
              marginLeft: "1rem",
              transition: "background-color 0.3s ease",
            }}
          >
            Order
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
