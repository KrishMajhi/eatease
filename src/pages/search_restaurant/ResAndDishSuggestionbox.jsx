import React, { useEffect, useState } from "react";
import "./SearchRes.css";
import { useSelector } from "react-redux";
import { cdn_swiggyimg, fullBigSwiggyIMg } from "../../assests/constants";
// import { v4 as uuidv4 } from "uuid";
import "./ResAndDishSuggestionbox.css";

const mockDishData = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    veg: true,
    price: 220,
    rating: 4.4,
    deliveryTime: "30-35 min",
    restaurant: "Surati Tadka",
    img: "https://images.unsplash.com/photo-1633945274405-d1b51a0f85cf?w=200",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    veg: false,
    price: 250,
    rating: 4.6,
    deliveryTime: "35-40 min",
    restaurant: "Hyderabadi Biryani House",
    img: "https://images.unsplash.com/photo-1603898037225-27c66cde1eaf?w=200",
  },
  {
    id: 3,
    name: "Veg Hakka Noodles",
    veg: true,
    price: 180,
    rating: 4.2,
    deliveryTime: "25-30 min",
    restaurant: "China Bowl",
    img: "https://images.unsplash.com/photo-1604908176997-05f4c7cba63b?w=200",
  },
  {
    id: 4,
    name: "Tandoori Chicken",
    veg: false,
    price: 320,
    rating: 4.5,
    deliveryTime: "40-45 min",
    restaurant: "Barbeque Nation",
    img: "https://images.unsplash.com/photo-1604908554042-6e618eb5d286?w=200",
  },
  {
    id: 5,
    name: "Cheese Burst Pizza",
    veg: true,
    price: 299,
    rating: 4.3,
    deliveryTime: "30-35 min",
    restaurant: "Domino’s",
    img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200",
  },
  {
    id: 6,
    name: "Mutton Rogan Josh",
    veg: false,
    price: 350,
    rating: 4.7,
    deliveryTime: "45-50 min",
    restaurant: "Kashmiri Zaika",
    img: "https://images.unsplash.com/photo-1640412536898-3b5c7d99b040?w=200",
  },
];
const ResAndDishSuggestionbox = ({ data }) => {
  const querystr = data[0];
  const metadata = data[1];
  const type = data[2];
  const [resLists, setresLists] = useState([]);
  const [Selectedres, setSelectedres] = useState();

  const [SelectedState, setSelectedState] = useState(type);
  // const [SortFilter, setSortFilter] = useState([DishList[0]]);
  const location = useSelector((state) => state.location);
  const [DishList, setDishList] = useState([]);
  const [ShowSortbox, setShowSortbox] = useState(false);
  const [selectedSort, setselectedSort] = useState("Relevance");
  const [isNormalCall, setIsNormalCall] = useState(true);
  // let normalcall = true;
  const lat = location.viewport
    ? (location.viewport.northeast.lat + location.viewport.southwest.lat) / 2
    : location.lat;

  const lng = location.viewport
    ? (location.viewport.northeast.lng + location.viewport.southwest.lng) / 2
    : location.lng;

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const trackingId = generateUUID();
  const queryUniqueId = generateUUID();

  async function restaurantSugesstionsCall(normalCall = true) {
    // normalcall = normalCall;
    setIsNormalCall(normalCall);

    try {
      let rawdata = normalCall
        ? await fetch(
            `https://web-production-5de0d.up.railway.app/api/swiggy/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${querystr}&trackingId=${trackingId}&submitAction=SUGGESTION&queryUniqueId=${queryUniqueId}&metaData=${encodeURIComponent(
              metadata
            )}`
          )
        : await fetch(
            `https://web-production-5de0d.up.railway.app/api/swiggy/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${querystr}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=${encodeURIComponent(
              queryUniqueId
            )}&metaData=${encodeURIComponent(
              metadata
            )}&selectedPLTab=RESTAURANT`
          );

      let jsonData = await rawdata.json();
      setSelectedres(
        jsonData?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT
          ?.cards?.[0]?.card?.card?.info
      );
      // normalCall ? setresLists( jsonData?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT ?.cards?.[1]?.card?.card?.restaurants || [] ) : setresLists( jsonData.data.cards[0].groupedCard.cardGroupMap.RESTAURANT.cards );
      setresLists(
        //? old:-.... normalCall..
        //   ? jsonData?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT
        //       ?.cards?.[1]?.card?.card?.restaurants || []....

        //! new:--  jsonData.data.cards[1].groupedCard.cardGroupMap.RESTAURANT.cards[1].card.card.restaurants
        normalCall
          ? jsonData?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT
              ?.cards?.[1]?.card?.card?.restaurants || []
          : jsonData.data.cards[0].groupedCard.cardGroupMap.RESTAURANT.cards
      );

      // console.log(resLists);
      // setresLists([]);
    } catch (err) {
      console.error(err);
    }
  }

  async function dishSuggestionCall(normalCall = true) {
    setIsNormalCall(normalCall);

    let rawdata = normalCall
      ? await fetch(
          `https://web-production-5de0d.up.railway.app/api/swiggy/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${encodeURIComponent(
            querystr
          )}&trackingId=${trackingId}&submitAction=SUGGESTION&queryUniqueId=${queryUniqueId}&metaData=${encodeURIComponent(
            metadata
          )}`
        )
      : await fetch(
          `https://web-production-5de0d.up.railway.app/api/swiggy/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${encodeURIComponent(
            querystr
          )}&trackingId=${trackingId}&submitAction=SUGGESTION&queryUniqueId=${queryUniqueId}&metaData=${encodeURIComponent(
            metadata
          )}&selectedPLTab=DISH `
        );

    let jsonData = await rawdata.json();
    setDishList(jsonData.data.cards[1].groupedCard.cardGroupMap.DISH.cards);
  }

  useEffect(() => {
    if (SelectedState === type) {
      // same tab as suggestion type
      if (SelectedState === "dish") {
        if (DishList.length === 0) {
          dishSuggestionCall(true);
        }
      } else {
        if (resLists.length === 0) {
          restaurantSugesstionsCall(true);
        }
      }
    } else {
      // different tab, need to use selectedPLTab API
      if (SelectedState === "dish") {
        if (DishList.length === 0) {
          dishSuggestionCall(false);
        }
      } else {
        if (resLists.length === 0) {
          restaurantSugesstionsCall(false);
        }
      }
    }
  }, [querystr, metadata, location, SelectedState, lat, lng]);

  console.log(SelectedState);

  return (
    <div className="ResAndDishSuggestionbox-container">
      {/* Switch buttons */}
      <div className="Switchbtns">
        <button
          className={`suggestionbtn ${
            SelectedState == "RESTAURANT".toLowerCase() ? "activeBtnState" : ""
          }`}
          onClick={() => setSelectedState("restaurant")}
        >
          Restaurants
        </button>
        <button
          className={`suggestionbtn ${
            SelectedState == "DISH".toLowerCase() ? "activeBtnState" : ""
          }`}
          onClick={() => setSelectedState("dish")}
        >
          Dishes
        </button>
      </div>

      {/* Sort container */}
      <div className={`Suggestions-SortsContainer `}>
        <div
          className={`sortType ${
            selectedSort !== "Relevance" ? "selected_sort" : ""
          }`}
          onClick={() => setShowSortbox((prev) => !prev)} // toggle open/close
        >
          Sort by{selectedSort ? ": " + selectedSort : ""}
        </div>
        <div
          style={{
            background: "none",
            marginRight: "8px",

            borderRight: "2px dotted black",
          }}
        ></div>

        {DishList.length > 0 &&
          DishList[0]?.card?.card?.facetList?.map((item, i) => (
            <li className="sortType" key={i}>
              {" "}
              {item.label}
            </li>
          ))}

        {ShowSortbox && (
          //>sortingbox
          <div className="sortlistcontainer">
            {DishList.length > 0 &&
              DishList[0]?.card?.card?.sortConfigs?.map((item) => (
                <li
                  className="sort-item"
                  key={item.key}
                  onClick={() => {
                    console.log("Selected sort:", item.key);
                    setselectedSort(item.title);
                    setShowSortbox(false); // close after selecting
                  }}
                >
                  {item.title}
                </li>
              ))}
          </div>
        )}
      </div>

      {/* Selected restaurant card */}
      {SelectedState === "restaurant" ? (
        // > restarant card rendering

        <>
          {Selectedres && (
            <div className="SelectedResCard-container">
              <div className="Suggestion-resCard" key={Selectedres.id}>
                <div className="imageAndoffer">
                  <img
                    src={fullBigSwiggyIMg + Selectedres.cloudinaryImageId}
                    alt={Selectedres.name}
                    className="suggestion-img"
                  />

                  {Selectedres.aggregatedDiscountInfoV3 ? (
                    <div className="Suggestionoffer">
                      <span className="main-text">
                        {Selectedres.aggregatedDiscountInfoV3.header}
                      </span>
                      {Selectedres.aggregatedDiscountInfoV3.subHeader && (
                        <span className="sub-text">
                          {"⁘ " +
                            Selectedres.aggregatedDiscountInfoV3.subHeader +
                            " ⁘"}
                        </span>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Details */}
                <div className="suggestions-ResDetails">
                  <h1>{Selectedres.name}</h1>
                  <div className="suggestionres-rtngdlvryprce">
                    ⭐{Selectedres.avgRating} •{" "}
                    {Selectedres?.sla?.slaString
                      ? Selectedres?.sla?.slaString + " •"
                      : ""}{" "}
                    {" ₹"}
                    {Selectedres.costForTwo / 100 + " FOR TWO"}
                  </div>
                  <p className="suggestionRes-cuisines">
                    {Selectedres?.cuisines?.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions list */}
          <h1 className="heading_suggestion">see more like this</h1>
          {resLists?.length > 0 ? (
            <div className="Suggestions-cardContainer">
              {isNormalCall
                ? // Case: normal restaurant search with array of restaurants
                  resLists.map((item) =>
                    item?.card?.card?.restaurants?.map((r) => {
                      const iteminfo = r.info;
                      if (!iteminfo) return null;

                      return (
                        <div
                          key={iteminfo.id}
                          className="Suggestion-resCard"
                        >
                          <div className="imageAndoffer">
                            <img
                              src={
                                fullBigSwiggyIMg + iteminfo.cloudinaryImageId
                              }
                              alt={iteminfo.name}
                              className="suggestion-img"
                            />
                            {iteminfo.aggregatedDiscountInfoV3 && (
                              <div className="Suggestionoffer">
                                <span className="main-text">
                                  {iteminfo.aggregatedDiscountInfoV3.header}
                                </span>
                                {iteminfo.aggregatedDiscountInfoV3
                                  .subHeader && (
                                  <span className="sub-text">
                                    {"• " +
                                      iteminfo.aggregatedDiscountInfoV3
                                        .subHeader +
                                      " •"}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="suggestions-ResDetails">
                            <h1>{iteminfo.name}</h1>
                            <div className="suggestionres-rtngdlvryprce">
                              {"⭐" + iteminfo.avgRating} •{" "}
                              {iteminfo?.sla?.slaString} •{" "}
                              {iteminfo.costForTwo / 100}
                            </div>
                            <p className="suggestionRes-cuisines">
                              {iteminfo?.cuisines?.join(", ")}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )
                : // Case: direct info object (dish → restaurant)
                  resLists.map((item) => {
                    const iteminfo = item?.card?.card?.info;
                    if (!iteminfo) return null;

                    return (
                      <div
                        key={iteminfo.id}
                        className="Suggestion-resCard"
                      >
                        <div className="imageAndoffer">
                          <img
                            src={fullBigSwiggyIMg + iteminfo.cloudinaryImageId}
                            alt={iteminfo.name}
                            className="suggestion-img"
                          />
                          {iteminfo.aggregatedDiscountInfoV3 && (
                            <div className="Suggestionoffer">
                              <span className="main-text">
                                {iteminfo.aggregatedDiscountInfoV3.header}
                              </span>
                              {iteminfo.aggregatedDiscountInfoV3.subHeader && (
                                <span className="sub-text">
                                  {"• " +
                                    iteminfo.aggregatedDiscountInfoV3
                                      .subHeader +
                                    " •"}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="suggestions-ResDetails">
                          <h1>{iteminfo.name}</h1>
                          <div className="suggestionres-rtngdlvryprce">
                            {"⭐" + iteminfo.avgRating} •{" "}
                            {iteminfo?.sla?.slaString} •{" "}
                            {"₹ "+iteminfo.costForTwo / 100 +" FOR TWO"}
                          </div>
                          <p className="suggestionRes-cuisines">
                            {iteminfo?.cuisines?.join(", ")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          ) : (
            <p className="no-results">No restaurants found</p>
          )}
        </>
      ) : (
        // > dish card rendering
        <div className="Suggestions-cardContainer">
          {DishList.filter(
            (item) =>
              item?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.Dish"
          ).map((item, idx) => {
            const iteminfo = item?.card?.card?.info;
            const restInfo = item?.card?.card?.restaurant?.info;

            if (!iteminfo) return null;

            return (
              <div className="Suggestion-dishCard" key={iteminfo?.id || idx}>
                <div className="redirectRestaurant_link">
                  <div className="linkpricedlvryName">
                    <h1 className="byresname">
                      By {restInfo?.name || "Unknown"}
                    </h1>
                    <p className="detailGrp">
                      {"⭐" + iteminfo?.ratings?.aggregatedRating?.rating ||
                        "–"}{" "}
                      • {restInfo?.sla?.slaString || ""}
                    </p>
                  </div>
                </div>

                <span className="lineCardbreaker"></span>

                <div className="imageAndofferANddetail-container">
                  <div className="suggestions-dishcardDetails">
                    {/* Veg / Non-veg */}
                    <span className="veg_nonveg-flag">
                      {iteminfo?.veg ? "🟢" : "🔴"}
                    </span>

                    {/* Dish Name */}
                    <h1>{iteminfo?.name || "Unnamed Dish"}</h1>

                    {/* Price */}
                    <h2>
                      ₹
                      {(
                        (iteminfo?.price || iteminfo?.defaultPrice || 0) / 100
                      ).toFixed(0)}
                    </h2>

                    {/* Ribbon */}
                    {iteminfo?.ribbon?.text && (
                      <span className="ribbon">{iteminfo.ribbon.text}</span>
                    )}

                    <button className="moreDetail-btn">More Details →</button>
                  </div>

                  {/* Dish Image */}
                  {iteminfo.imageId ? (
                    <img
                      src={
                        iteminfo?.imageId
                          ? fullBigSwiggyIMg + iteminfo.imageId
                          : cdn_swiggyimg + "default_dish.png"
                      }
                      alt={iteminfo?.name || "Dish"}
                      className="suggestion-img"
                    />
                  ) : (
                    ""
                  )}

                  <button className="addtocartbtn-dishcard">Add +</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResAndDishSuggestionbox;

// normal rescall
// data.cards[1].groupedCard.cardGroupMap.RESTAURANT.cards;
// getting frrsy card
// data.cards[1].groupedCard.cardGroupMap.RESTAURANT.cards[0].card.card;

// from dishcall
// data.cards[0].groupedCard.cardGroupMap.RESTAURANT.cards;
// getting frrsy card
// data.cards[0].groupedCard.cardGroupMap.RESTAURANT.cards[0].card.card;

// const cardsPath =
//   jsonData?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards ||
//   jsonData?.data?.cards?.[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards ||
//   [];

// setSelectedres(cardsPath[0]?.card?.card?.info || null);
// setresLists(cardsPath.slice(1));