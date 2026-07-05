// https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0147579&lng=80.19095260000002&collection=142465&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null

// const categories = [
//   { id: 1, name: "Pizza", image: "https://picsum.photos/100?random=1" },
//   { id: 2, name: "Biryani", image: "https://picsum.photos/100?random=2" },
//   { id: 3, name: "Desserts", image: "https://picsum.photos/100?random=3" },
//   { id: 4, name: "Burger", image: "https://picsum.photos/100?random=4" },
//   { id: 5, name: "Chinese", image: "https://picsum.photos/100?random=5" },
//   { id: 6, name: "Ice Cream", image: "https://picsum.photos/100?random=6" },
//   { id: 7, name: "South Indian", image: "https://picsum.photos/100?random=7" },
//   { id: 8, name: "North Indian", image: "https://picsum.photos/100?random=8" },
//   { id: 9, name: "Shakes", image: "https://picsum.photos/100?random=9" },
//   { id: 10, name: "Sandwich", image: "https://picsum.photos/100?random=10" },
// ];import { useRef, useState } from "react";
// !collectionapi=https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0147579&lng=80.19095260000002&collection=83636&tags=layout_CCS_Chinese&sortBy=&filters=&type=rcv2&offset=0&page_type=null

import { useRef, useState } from "react";
import { cdn_swiggyimg } from "../../assests/constants";
import "./Categories.css";
import { Link } from "react-router-dom";
function PeekCarousel({ items }) {
  const containerRef = useRef(null);
  const [clicks, setClicks] = useState(0);
  console.log(items);

  const scroll = (distance, direction) => {
    if (containerRef.current) {
      if (direction === "right") {
        // if (clicks <= 13) {
        setClicks((prev) => prev + 1);
        // } else {
        //   setClicks(prev=>prev=13)
        // }
      } else {
        setClicks((prev) => Math.max(prev - 1, 0));
      }
      containerRef.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  return (
    <div className="categories-section">
      {/* Header */}
      <div className="carousel-header">
        <h2 className="col-h">What's on your mind?</h2>
        <div className="arrow-buttons">
          <button
            className="nav-btn left"
            onClick={() => scroll(-250, "left")}
            style={{
              background: clicks === 0 ? "#d3d3d357" : "#d3d3d3",
              color: clicks === 0 ? "#00000075" : "black",
            }}
          >
            ←
          </button>
          <button
            className="nav-btn right"
            onClick={() => clicks < 13 && scroll(250, "right")}
            style={{
              background: clicks >= 13 ? "#d3d3d357" : "#d3d3d3",
              color: clicks >= 13 ? "#00000075" : "black",
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable list */}
      <div className="carousel-wrapper">
        <div className="categories-container" ref={containerRef}>
          {items.map((cat) => {
            // Extract collectionId and optional tag from Swiggy link
            const collectionId = cat.action.link.split("collections/")[1]; // e.g., "83636&layout_CCS_Chinese"
            // console.log(collectionId);

            return (
              <Link
                to={`/Foodcollections/${collectionId}`}
                key={cat.id}
                className="category-card"
              >
                <img
                  src={cdn_swiggyimg + cat.imageId}
                  alt={cat.accessibility?.altText || cat.action.text}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PeekCarousel;


//> https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.002&lng=73.1283446&restaurantId=726166&catalog_qa=undefined&query=Chinese&submitAction=ENTER