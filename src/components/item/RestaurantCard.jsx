import React from "react";
import "./RestaurantCard.css";

const RestaurantCard = ({ name, cuisines, imageUrl, rating, deliveryTime, priceRange, areaName, discount }) => {
  return (
    <div className="restaurant-card">
      <div className="card-image-wrap">
        <img
          src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + imageUrl}
          alt={name}
          className="restaurant-image"
        />
        <div className="card-gradient" />
        {deliveryTime && (
          <span className="card-time-badge">🕐 {deliveryTime}</span>
        )}
        {discount && (
          <span className="card-discount-badge">{discount}</span>
        )}
      </div>

      <div className="restaurant-info">
        <h2 className="restaurant-name">{name}</h2>
        <div className="restaurant-details">
          <span className="rating">★ {rating}</span>
          <span className="dot">•</span>
          <span className="delivery-time">{deliveryTime}</span>
        </div>
        <p className="restaurant-cuisines">
          {Array.isArray(cuisines) ? cuisines.join(", ") : cuisines}
        </p>
        {areaName && <p className="restaurant-area">{areaName}</p>}
        {priceRange && <span className="card-price-tag">{priceRange}</span>}
      </div>
    </div>
  );
};

export default RestaurantCard;
