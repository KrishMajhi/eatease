import React, { useEffect, useState } from "react";
import "./RestaurantDetail.css";
import { useParams } from "react-router";
import Accordion from "../accordian/Accordion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantDetail = () => {
  const [resdetail, setresdetail] = useState(null);
  const [accordionData, setaccordionData] = useState([]);
  const [showindex, setshowindex] = useState(2);
  const [menuClickstate, setmenuClickstate] = useState(false);
  const [onFocusState, setonFocusState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { resid } = useParams();
  const location = useSelector((state) => state.location);

  const lat = location.viewport
    ? (location.viewport.northeast.lat + location.viewport.southwest.lat) / 2
    : location.lat;

  const lng = location.viewport
    ? (location.viewport.northeast.lng + location.viewport.southwest.lng) / 2
    : location.lng;

  async function resapifetch() {
    try {
      // ✅ Call YOUR Playwright backend
      const backendUrl = `https://web-production-5de0d.up.railway.app/api/menu?lat=${lat}&lng=${lng}&restaurantId=${resid}&query=`;

      console.log("📡 Fetching from backend:", backendUrl);

      const response = await fetch(backendUrl);
      const jsonResdata = await response.json();

      console.log("✅ Menu JSON:", jsonResdata);

      const info = jsonResdata?.data?.cards?.[2]?.card?.card?.info;

      const accordData =
        jsonResdata?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (item) =>
            item?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
        ) || [];

      setaccordionData(accordData);
      setresdetail(info);
    } catch (error) {
      console.error("🚨 API Error:", error.message);
      setresdetail(null);
      setaccordionData([]);
    }
  }

  useEffect(() => {
    resapifetch();
  }, [resid, location]);

  return !resdetail ? (
    <div>....loading</div>
  ) : (
    <div className="restaurant-header">
      <nav className="breadcrumb">
        Home / {} / <span className="current">{resdetail.name}</span>
      </nav>

      <h1 className="restaurantname">{resdetail.name}</h1>

      <div className="tabs">
        <span className="active-tab">Order Online</span>
        <span className="inactive-tab">Dineout</span>
      </div>

      <div className="restaurant-info-box">
        <div className="restaurant-rating">
          <span className="rating-circle">★</span>
          <span>
            {resdetail.avgRating}{" "}
            <strong>{resdetail.totalRatingsString}</strong> •{" "}
            {resdetail.costForTwoMessage}
          </span>
        </div>

        <div className="cuisine-tags">
          {resdetail?.cuisines?.slice(0, 2).map((cuisine, i) => (
            <span key={i} className="tag">
              {cuisine}
              {i === 0 ? "," : ""}
            </span>
          ))}
        </div>

        <div className="outlet-info">
          <span>Outlet</span>
          <span style={{ fontWeight: "800" }}> Little world Mall</span> ▼
        </div>

        <div className="resdelivery-time">
          {resdetail.sla.minDeliveryTime}-{resdetail.sla.maxDeliveryTime} mins
        </div>
      </div>

      <h2 className="deals-heading">Deals for you</h2>

      <div className="deals-container">
        <div className="deal-card">
          <div className="deal-badge">DEAL OF DAY</div>
          <div>
            <strong>Items At ₹59</strong>
            <p>ON SELECT ITEMS</p>
          </div>
        </div>

        <div className="deal-card">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${resdetail.cloudinaryImageId}`}
            className="bank-logo"
            alt="offer"
          />
          <div>
            <strong>Flat ₹75 Off</strong>
            <p>USE HDFC75</p>
          </div>
        </div>
      </div>

      {/* Menu Search Navigation */}
      <h2 className="menu-heading-resdetail">{" ↩※ MENU ※↪ "}</h2>

      <Link to={`/restaurants/${resdetail.name}/${resid}`}>
        <div className="menu-search-2">
          <span>Search for dishes</span>
          <div className="magnifying-glass" />
        </div>
      </Link>

      {/* Accordion Menu */}
      <div className="accordianbody">
        {accordionData.map((accords, index) => (
          <React.Fragment key={accords.card.card.categoryId}>
            <div id={`accordion-${accords.card.card.categoryId}`}>
              <Accordion
                key={accords.card.card.categoryId}
                accname={accords.card.card.title}
                itemcards={accords.card.card.itemCards}
                downkey={index === showindex}
                index={index}
                showindex={showindex}
                setshowindex={setshowindex}
              />
            </div>
            <div style={{ borderBottom: "10px solid #c6d4da" }}></div>
          </React.Fragment>
        ))}
      </div>

      {/* Right Side Menu Shortcut */}
      <div className="menu-section">
        <div
          className="menubtn"
          onClick={() => setmenuClickstate(!menuClickstate)}
        >
          MENU
        </div>

        <ul
          className={`menu-list ${
            menuClickstate || onFocusState ? "active" : ""
          }`}
          onFocus={() => setonFocusState(true)}
          onBlur={() => setonFocusState(false)}
        >
          {accordionData.map((item) => (
            <li
              key={item.card.card.categoryId}
              onClick={() => {
                const target = document.getElementById(
                  `accordion-${item.card.card.categoryId}`,
                );
                if (target) {
                  target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              {item.card.card.title}{" "}
              <span className="item-count">
                {item.card.card.itemCards?.length || 0}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantDetail;

// `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.002&lng=73.1283446&restaurantId=49513&catalog_qa=undefined&submitAction=ENTER`

// `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.002&lng=73.1283446&restaurantId=447754&catalog_qa=undefined&submitAction=ENTER`