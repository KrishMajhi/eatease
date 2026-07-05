import React, { useEffect, useState } from "react";
import "./Home.css";
import RestaurantCard from "../../components/item/RestaurantCard";
import Shimmer from "../../components/shimmer/Shimmer";
import Accordion from "../../components/accordian/Accordion";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import SushiAnimation from "../../assests/animations/Sushi.json";
import PeekCarousel from "../../components/horizontal scroll bar(home)/WhatsOnYourMind";

const FILTERS = ["All", "Top Rated", "Fast Delivery", "Under ₹200"];

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [carousel, setcarousel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const location = useSelector((state) => state.location);

  const callswiggyapi = async () => {
    try {
      const lat = location.viewport
        ? (location.viewport.northeast.lat + location.viewport.southwest.lat) / 2
        : location.lat;
      const lng = location.viewport
        ? (location.viewport.northeast.lng + location.viewport.southwest.lng) / 2
        : location.lng;

      const response = await fetch(
        `http://localhost:8000/api/swiggy/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const result = await response.json();

      let list = [];
      if (result?.data?.cards?.length) {
        for (const card of result.data.cards) {
          const restaurantsList = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          if (restaurantsList?.length) { list = restaurantsList; break; }
        }
      }

      const carouselData =
        result?.data?.cards?.find((c) => c?.card?.card?.imageGridCards?.info)
          ?.card?.card?.imageGridCards?.info || [];

      setcarousel(carouselData);
      setRestaurants(list);
    } catch (error) {
      console.log("API error:", error.message);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callswiggyapi();
  }, [location]);

  const filteredRestaurants = restaurants.filter((r) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Top Rated") return r.info.avgRating >= 4.3;
    if (activeFilter === "Fast Delivery") return r.info.sla?.deliveryTime <= 30;
    if (activeFilter === "Under ₹200") return r.info.costForTwo <= 20000;
    return true;
  });

  const locationName = location?.description || "your area";

  return (
    <div className="home-container">
      {/* Hero */}
      <div className="home-hero">
        <h1>Good food, <span>delivered fast.</span></h1>
        <p>Restaurants near {locationName}</p>
      </div>

      {/* Carousel */}
      {(loading || carousel.length > 0) && (
        <div className="carousel-section">
          {loading ? (
            <div className="animation-wrapper">
              <Lottie animationData={SushiAnimation} loop className="delivery-animation" />
            </div>
          ) : (
            <PeekCarousel items={carousel} />
          )}
        </div>
      )}

      <div className="linebreaker" />

      {/* Restaurant section */}
      <div className="restaurant-section">
        <div className="section-heading">
          <h2>Restaurants near you</h2>
          {!loading && <p>{filteredRestaurants.length} restaurants available</p>}
        </div>

        {/* Filter chips */}
        {!loading && restaurants.length > 0 && (
          <div className="filter-bar">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-chip${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <Shimmer />
        ) : filteredRestaurants.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: "3rem" }}>🍽️</span>
            <p>No restaurants match this filter. Try another!</p>
          </div>
        ) : (
          <div className="restaurant-list">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.info.id}>
                <RestaurantCard
                  name={restaurant.info.name}
                  cuisines={restaurant.info?.cuisines || []}
                  imageUrl={restaurant.info.cloudinaryImageId}
                  rating={restaurant.info.avgRating}
                  deliveryTime={restaurant.info.sla?.slaString}
                  priceRange={`₹${restaurant.info.costForTwo / 100} for two`}
                  areaName={restaurant.info.areaName}
                  discount={restaurant.info?.aggregatedDiscountInfoV3?.header}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
