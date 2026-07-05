import React, { useState } from "react"; // ✅ ADDED useState import
import "./AccordionItem.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/CartSlice";

const AccordionItem = ({ iteminfo }) => {
const {
name,
price,
description,
ratings,
isVeg,
imageId,
defaultPrice,
id: accordianItemId,
} = iteminfo;
// console.log(id);
// console.log(iteminfo);

const dispatch = useDispatch();
const cart = useSelector((store) => store.mycart.cart);

<!-- ? -->

const alreadyAdded = cart.some( -->

    (item) => item.accordianItemId == accordianItemId

);

<!-- ? -->

// !to make
const [addToCartbtnIsDisabled, setaddToCartbtnIsDisabled] = useState(false);
const [textVisible, setTextVisible] = useState(false); // ✅ STATE for toggling full/truncated description

const truncated = description && description.length > 100 && !textVisible;

// !to make--remaining
const displayDescription = truncated
? description.slice(0, 100) + "..."
: description;

return (

<div className="accordion-food-item">
<div className="left">
<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
<span
className={`food-symbol ${isVeg === 1 ? "veg" : "non-veg"}`} ></span>
<span>{isVeg === 1 ? "Veg" : "Non-Veg"}</span>
</div>

        <h3 className="item-name">{name}</h3>

        <p className="price">₹{price ? price / 100 : defaultPrice / 100}</p>

        {ratings?.aggregatedRating?.rating ? (
          <p className="accrating">
            ⭐ {ratings.aggregatedRating.rating} (
            {ratings.aggregatedRating.ratingCount || 0})
          </p>
        ) : null}

        {description && (
          <p className="description">
            {displayDescription}
            {description.length > 100 && (
              <span
                className="toggle-text"
                onClick={() => setTextVisible((prev) => !prev)} // ✅ TOGGLE on click
              >
                {textVisible ? " ..Show Less" : " ..Read More"}
              </span>
            )}
          </p>
        )}
      </div>

      <div className="right">
        <img
          className="item-image"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
          alt={name}
        />
        <!--! <button -->
          className="add-button"
          onClick={() => {
            dispatch(
              addItem({
                accordianItemId,
                name,
                price: price || defaultPrice,
                description,
                imageId,
              })
            );

            alreadyAdded
              ? setaddToCartbtnIsDisabled(true)
              : setaddToCartbtnIsDisabled(false);
          }}
          disabled={addToCartbtnIsDisabled}
          style={{ background: addToCartbtnIsDisabled ? "darkgreen" : "white" }}
        >
          {addToCartbtnIsDisabled ? "Added to cart!" : "Add to cart"}
        <!-- !</button> -->
        <p className="customisable">Customisable</p>
      </div>
    </div>

);
};

export default AccordionItem; talking for this
