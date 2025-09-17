import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1));
      return total + price * item.quantity;
    }, 0);
  };

  const calculateItemTotal = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return price * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${calculateItemTotal(item)}</p>
                <div className="cart-item-actions">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                  <button onClick={() => handleRemove(item)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <h3>Total: ${calculateTotalAmount()}</h3>
          <div className="cart-buttons">
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={() => alert("Checkout functionality to be added")}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
