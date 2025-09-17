import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 🔹 Calculate total cost of all items
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.cost.substring(1)); // remove "$"
      return total + itemPrice * item.quantity;
    }, 0);
  };

  // 🔹 Calculate subtotal for each item
  const calculateItemTotal = (item) => {
    const itemPrice = parseFloat(item.cost.substring(1));
    return itemPrice * item.quantity;
  };

  // 🔹 Continue Shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  // 🔹 Checkout (future feature)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // 🔹 Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  // 🔹 Decrement item quantity (remove if goes below 1)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // 🔹 Remove item
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
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
