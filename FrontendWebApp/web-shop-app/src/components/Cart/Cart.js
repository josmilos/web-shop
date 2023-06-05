import React from 'react';
import Modal from './Modal';
import { Button } from '@mui/material';

const Cart = (props) => {
  const cartItems = (
    <ul style={{
      listStyle: 'none',
      margin: 0,
      padding: 0,
    }}>
      {[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        margin: '1rem 0',
      }}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div style={{
        textAlign: 'right',
      }}>
        <Button
          variant="outlined"
          style={{
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: '1px solid #16273E',
            padding: '0.35rem 2rem',
            borderRadius: '25px',
            marginLeft: '1rem',
            color: '#233B58',
          }}
          onClick={props.onClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          style={{
            cursor: 'pointer',
            backgroundColor: '#3D70B2',
            color: 'white',
            padding: '0.7rem 2.5rem',
            borderRadius: '25px',
            marginLeft: '1rem',
            transition: 'background-color 0.3s ease',
          }}
        >
          Order
        </Button>
      </div>
    </Modal>
  );
};

export default Cart;
