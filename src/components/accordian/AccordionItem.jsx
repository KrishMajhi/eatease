import React, { useEffect, useState } from "react";
import "./AccordionItem.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, incrementQty, decrementQty } from "../../store/CartSlice";

const AccordionItem = ({ iteminfo }) => {
  const { name, price, description, ratings, isVeg, imageId, defaultPrice, id: accordianItemId } = iteminfo;

  const dispatch = useDispatch();
  const cart = useSelector((store) => store.mycart.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartItem = cart.find((item) => item.accordianItemId == accordianItemId);
  const [textVisible, setTextVisible] = useState(false);
  const truncated = description && description.length > 100 && !textVisible;
  const displayDescription = truncated ? description.slice(0, 100) + "…" : description;

  return (
    <div className="accordion-food-item">
      <div className="acc-left">
        <span className={`veg-pill ${isVeg === 1 ? "veg" : "nonveg"}`}>
          <span className="veg-dot" />
          {isVeg === 1 ? "Veg" : "Non-Veg"}
        </span>

        <h3 className="item-name">{name}</h3>

        <p className="item-price">₹{price ? price / 100 : defaultPrice / 100}</p>

        {ratings?.aggregatedRating?.rating && (
          <p className="item-rating">
            ★ {ratings.aggregatedRating.rating}
            <span style={{ color: "var(--clr-ink4)", fontWeight: 400 }}>
              {" "}({ratings.aggregatedRating.ratingCount || 0})
            </span>
          </p>
        )}

        {description && (
          <p className="item-description">
            {displayDescription}
            {description.length > 100 && (
              <span className="toggle-text" onClick={() => setTextVisible((v) => !v)}>
                {" "}{textVisible ? "Show less" : "Read more"}
              </span>
            )}
          </p>
        )}
      </div>

      <div className="acc-right">
        {imageId ? (
          <img
            className="item-image"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
            alt={name}
          />
        ) : (
          <div className="item-image-placeholder">🍽️</div>
        )}

        {cartItem ? (
          <div className="qty-stepper">
            <button
              className="qty-btn"
              onClick={() => dispatch(decrementQty(accordianItemId))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="qty-count">{cartItem.qty}</span>
            <button
              className="qty-btn"
              onClick={() => dispatch(incrementQty(accordianItemId))}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="add-button"
            onClick={() =>
              dispatch(
                addItem({ accordianItemId, name, price: price || defaultPrice, description, imageId })
              )
            }
          >
            + ADD
          </button>
        )}

        <p className="customisable">Customisable</p>
      </div>
    </div>
  );
};

export default AccordionItem;
