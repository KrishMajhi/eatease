import React, { useEffect, useState } from "react";
import "./SearchRes.css";
import { useSelector } from "react-redux";
import { cdn_swiggyimg } from "../../assests/constants";
import { Link } from "react-router-dom";
import ResAndDishSuggestionbox from "./ResAndDishSuggestionbox";

function SearchRes() {
  const [inputvalue, setinputvalue] = useState("");
  const [Suggestions, setSuggestions] = useState([]);
  const [LoadingState, setLoadingState] = useState(true);
  const [itemClicked, setitemClicked] = useState(false);
  const [ShowBox, setShowBox] = useState(false);
  const [lastInput, setLastInput] = useState("");
  const [PassData, setPassData] = useState();
  const location = useSelector((state) => state.location);

  const lat = location.viewport
    ? (location.viewport.northeast.lat + location.viewport.southwest.lat) / 2
    : location.lat;
  const lng = location.viewport
    ? (location.viewport.northeast.lng + location.viewport.southwest.lng) / 2
    : location.lng;

  const fetchRestaurants = async () => {
    if (!inputvalue.trim()) { setSuggestions([]); return; }
    try {
      const rawdata = await fetch(
        `http://localhost:8000/api/swiggy/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${inputvalue}&trackingId=undefined&includeIMItem=true`
      );
      const jsonData = await rawdata.json();
      setSuggestions(jsonData?.data?.suggestions || []);
    } catch (err) {
      console.error("Suggestions fetch error:", err);
      setSuggestions([]);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchRestaurants(), 400);
    return () => clearTimeout(timer);
  }, [inputvalue]);

  return (
    <div className="search-page">
      <div className="search-container">
        <h1 className="search-page-title">Search</h1>

        <div className="myinputbox">
          {ShowBox && (
            <span
              className="backBtn"
              onClick={() => {
                if (!inputvalue && lastInput) {
                  setinputvalue(lastInput);
                  setLastInput("");
                } else if (inputvalue) {
                  setLastInput(inputvalue);
                  setinputvalue("");
                  setShowBox(false);
                } else {
                  setShowBox(false);
                }
              }}
            >
              ➤
            </span>
          )}
          <input
            type="text"
            placeholder="Search restaurants or dishes…"
            className="search-input"
            value={inputvalue}
            onChange={(e) => {
              setinputvalue(e.target.value);
              if (!e.target.value.trim()) setShowBox(false);
            }}
          />
          {inputvalue && (
            <span
              className="clrtxt"
              onClick={() => {
                setLastInput(inputvalue);
                setinputvalue("");
              }}
            >
              ✕
            </span>
          )}
        </div>

        {inputvalue.trim() && !ShowBox ? (
          <ul className="suggestion-container">
            {Suggestions.length > 0 ? (
              Suggestions.map((item, i) => (
                <li
                  className="search-item"
                  key={i}
                  onClick={() => {
                    setitemClicked(true);
                    setShowBox(true);
                    setPassData([item.text, item.metadata, item.type.toLowerCase()]);
                    setinputvalue(item.text);
                  }}
                >
                  {item.cloudinaryId && (
                    <img
                      src={cdn_swiggyimg + item.cloudinaryId}
                      alt={item.text}
                      className="searchItem-img"
                    />
                  )}
                  <div className="searchitem-details">
                    <h3 className="searchItem-name">{item.text}</h3>
                    <p className={`suggestion-type ${item.type === "DISH" ? "dish" : "rest"}`}>
                      {item.type === "DISH" ? "🍽 Dish" : "🏪 Restaurant"}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li style={{ padding: "20px", color: "var(--clr-ink4)", textAlign: "center", listStyle: "none" }}>
                No results found for "{inputvalue}"
              </li>
            )}
          </ul>
        ) : ShowBox ? (
          <ResAndDishSuggestionbox data={PassData} />
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--clr-ink4)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🔍</div>
            <p style={{ fontWeight: 600 }}>Search for restaurants or dishes</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchRes;
