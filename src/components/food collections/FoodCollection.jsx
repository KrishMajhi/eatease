import React, { useEffect, useState } from "react";
import "./foodcollection.scss";
import RestaurantCard from "../item/RestaurantCard";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";
import Shimmer from "../shimmer/Shimmer";
import ShimmerCard from "../shimmer_foodcollection/ShimmerCard";

function FoodCollection() {
  const { collectionid } = useParams();
  const locationHook = useLocation();
  const [restaurants, setRestaurants] = useState([]);
  const [collectiondata, setCollectionData] = useState(null);
  const [loading, setloading] = useState(true);
  const queryParams = new URLSearchParams(locationHook.search);
  let tags = queryParams.get("tags");

  const location = useSelector((state) => state.location);

  const lat = location.viewport
    ? (location.viewport.northeast.lat + location.viewport.southwest.lat) / 2
    : location.lat;

  const lng = location.viewport
    ? (location.viewport.northeast.lng + location.viewport.southwest.lng) / 2
    : location.lng;

  async function callfoodCollectionapi() {
    try {
      let rawdata = await fetch(
        `http://localhost:8000/api/swiggy/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collectionid}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      );
      let resdata = await rawdata.json();

      setCollectionData(resdata?.data?.cards[0]?.card?.card);

      const filteredRestaurants =
        resdata?.data?.cards?.filter(
          (item) =>
            item.card?.card["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        ) || [];

      setRestaurants(filteredRestaurants);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    callfoodCollectionapi();
  }, [collectionid, location, tags]);

  return (
    <div className="food-container">
      {loading ? (
        <ShimmerCard />
      ) : (
        <>
          <div className="topheadingPara">
            <h1 className="collection-name">{collectiondata?.title}</h1>
            <p className="describe">{collectiondata?.description}</p>
          </div>

          <h2 className="para-food">Restaurants to Explore</h2>
        </>
      )}
      <div className="restaurantFoodcollectionsection">
        {loading
          ? Array(6)
              .fill(null)
              .map((_, i) => <Shimmer key={i} />)
          : restaurants.map((res) => {
              const {
                id,
                name,
                cuisines,
                avgRating,
                cloudinaryImageId,
                costForTwo,
                areaName,
              } = res.card.card.info;

              return (
                <div key={id}>
                  <RestaurantCard
                    name={name}
                    imageUrl={cloudinaryImageId}
                    rating={avgRating}
                    deliveryTime={
                      res.card?.card?.info.sla?.slaString || "no delivery time"
                    }
                    restaurant={res}
                    priceRange={costForTwo}
                    cuisines={cuisines}
                    areaName={areaName}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default FoodCollection;
