import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LocationSearch.css";
import { setLocation } from "../../store/locationSlice";
export default function LocationSearch() {
  const savedDescription = useSelector((store) => store.location.description);
  const [inputData, setInputData] = useState(savedDescription || "");
  const isFirstRender = useRef(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  async function get_suggestionLocation() {
    if (!inputData.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/zomato/location/search?q=${encodeURIComponent(
          inputData,
        )}`,
      );

      const locationData = await res.json();

      setSuggestions(locationData.locationSuggestions || []);
    } catch (err) {
      console.error("Location fetch error:", err);
    }
  }

  async function handleonclick(location) {
    try {
      const url =
        `http://localhost:8000/api/zomato/location/get?` +
        `lat=${location.entity_latitude}` +
        `&lon=${location.entity_longitude}` +
        `&entity_id=${location.entity_id}` +
        `&entity_type=${location.entity_type}` +
        `&userDefinedLatitude=${location.entity_latitude}` +
        `&userDefinedLongitude=${location.entity_longitude}` +
        `&placeId=${encodeURIComponent(location.place.place_id)}` +
        `&placeType=${location.place.place_type}` +
        `&placeName=${encodeURIComponent(location.place.place_name)}` +
        `&cellId=${location.place.cell_id}` +
        `&addressId=0` +
        `&isOrderLocation=${location.is_order_location}` +
        `&forceEntityName=${encodeURIComponent(location.entity_name)}` +
        `&persist=true`;

      const rawData = await fetch(url);

      const jsonData = await rawData.json();

      const locationInfo = jsonData.locationDetails;

      if (!locationInfo) return;

      dispatch(
        setLocation({
          description: locationInfo.displayTitle,
          lat: locationInfo.userDefinedLatitude,
          lng: locationInfo.userDefinedLongitude,
          entityId: locationInfo.entityId,
          entityType: locationInfo.entityType,
          cityId: locationInfo.cityId,
          deliverySubzoneId: locationInfo.deliverySubzoneId,
          placeId: locationInfo.placeId,
          cellId: locationInfo.cellId,
          country: locationInfo.countryName,
        }),
      );

      setInputData(location.display_title);
      setShowSuggestions(false);
      setSuggestions([]);

      console.log(locationInfo);
    } catch (err) {
      console.error("Coordinates fetch error:", err);
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const handler = setTimeout(() => {
      get_suggestionLocation();
    }, 350);

    return () => clearTimeout(handler);
  }, [inputData]);

  return (
    <div className="location-container">
      <div className="location-input-wrap">
        <span className="loc-icon">📍</span>

        <input
          className="location-input"
          value={inputData}
          placeholder="Search your location..."
          onChange={(e) => {
            setInputData(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        {inputData && (
          <button
            className="loc-clear"
            onClick={() => {
              setInputData("");
              setSuggestions([]);
            }}
          >
            ✕
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-box">
          {suggestions.map((s, index) => (
            <div
              key={index}
              className="suggestion-item"
              onMouseDown={() => handleonclick(s)}
            >
              <span className="sug-pin">📍</span>

              <div>
                <div className="sug-main">{s.display_title}</div>

                <div className="sug-secondary">{s.display_subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
