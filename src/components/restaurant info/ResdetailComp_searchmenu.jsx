import React, { useEffect, useState } from "react";
import "./ResdetailComp_searchmenu.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { cdn_swiggyimg } from "../../assests/constants";

function ResdetailComp_searchmenu() {
  const [searchText, setSearchText] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useSelector((state) => state.location);
  const { resname, resid } = useParams();

  const lat = location.viewport
    ? (location.viewport.northeast.lat + location.viewport.southwest.lat) / 2
    : location.lat;

  const lng = location.viewport
    ? (location.viewport.northeast.lng + location.viewport.southwest.lng) / 2
    : location.lng;

  async function callFecthres_api() {
    setLoading(true);
    try {
      // ✅ Call YOUR Playwright backend
      const backendUrl = `http://localhost:8000/api/menu?lat=${lat}&lng=${lng}&restaurantId=${resid}&query=${encodeURIComponent(searchText)}`;

      console.log("📡 Searching via backend:", backendUrl);

      const rawdata = await fetch(backendUrl);
      const jsondata = await rawdata.json();

      console.log("✅ Search results:", jsondata);

      setMenuItems(jsondata?.data?.cards || []);
    } catch (e) {
      console.log("❌ Search error:", e);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!searchText.trim()) return;

    const timer = setTimeout(() => {
      callFecthres_api();
    }, 600);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="res-menu-list">
      <div className="searchinputbox_res">
        <Link className="back-arrow" to={`/restaurants/${resid}`}>
          &#8592;
        </Link>
        <input
          type="text"
          placeholder={`Search for ${resname}...`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <span className="clear-input" onClick={() => setSearchText("")}>
            &#10005;
          </span>
        )}
      </div>

      {loading && <p className="loading-text">Searching...</p>}

      {menuItems.length > 0 &&
        menuItems.map((item, index) => {
          const info = item.card?.card?.info;
          if (!info) return null;

          return (
            <div className="res-menu-item" key={info.id || index}>
              <div className="res-menu-left">
                <div className="res-menu-tag">
                  <div className={`food-tag non-veg`}>
                    <div className="triangle"></div>
                  </div>
                </div>

                <h3 className="res-menu-name">{info.name}</h3>
                <p className="res-menu-price">₹{info.price / 100}</p>

                {info?.offerTags?.length > 0 && (
                  <div className="res-menu-Offertag">
                    {info.offerTags[0]?.title} {info.offerTags[0]?.subTitle}
                  </div>
                )}

                <p className="res-menu-rating">
                  ⭐ {info.ratings?.aggregatedRating?.rating || "N/A"} (
                  {info.ratings?.aggregatedRating?.ratingCountV2 || 0})
                </p>

                {info.isGuiltfree && (
                  <div className="res-guiltfreetag">Guilt-Free</div>
                )}

                <p className="res-menu-description">{info.description}</p>
              </div>

              <div className="res-menu-right">
                <img
                  className="res-menu-image"
                  src={`${cdn_swiggyimg}${info.imageId}`}
                  alt={info.name}
                />
                <button className="res-menu-add-button">Add to cart</button>
                <p className="res-menu-customisable">Customisable</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ResdetailComp_searchmenu;
