import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, incrementQty, decrementQty } from "../../store/CartSlice";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.mycart.cart);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price / 100) * (item.qty || 1),
    0
  );
  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const taxes = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + deliveryFee + taxes).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-inner">
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet. Let's fix that!</p>
            <Link to="/">Browse Restaurants</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <h1 className="cart-title">Your Cart</h1>

        {/* Item list */}
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.accordianItemId}>
              {item.imageId ? (
                <img
                  className="cart-item-img"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fit/${item.imageId}`}
                  alt={item.name}
                />
              ) : (
                <div className="cart-item-img-placeholder">🍽️</div>
              )}

              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                {item.description && (
                  <p className="cart-item-desc">{item.description.slice(0, 60)}…</p>
                )}
                <p className="cart-item-price">
                  ₹{(item.price / 100).toFixed(2)}
                  {item.qty > 1 && (
                    <span className="cart-item-linetotal">
                      {" "}× {item.qty} = ₹{((item.price / 100) * item.qty).toFixed(2)}
                    </span>
                  )}
                </p>
              </div>

              <div className="cart-item-actions">
                <div className="cart-qty-stepper">
                  <button
                    className="cart-qty-btn"
                    onClick={() => dispatch(decrementQty(item.accordianItemId))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="cart-qty-count">{item.qty || 1}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() => dispatch(incrementQty(item.accordianItemId))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => dispatch(removeItem(item.accordianItemId))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill summary */}
        <div className="cart-bill">
          <h3>Bill Summary</h3>
          <div className="bill-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="bill-row">
            <span>Delivery fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="bill-row">
            <span>Taxes (5%)</span>
            <span>₹{taxes.toFixed(2)}</span>
          </div>
          <div className="bill-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>
          <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
