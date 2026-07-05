import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact/Contact.jsx";
import RestaurantDetail from "./components/restaurant info/RestaurantDetail.jsx";
import RestaurantCard from "./components/item/RestaurantCard.jsx";
import Shimmer from "./components/shimmer/Shimmer.jsx";
import Menu from "./pages/food_page/Menu.jsx";
import Cart from "./pages/cart/Cart.jsx";
import FoodCollection from "./components/food collections/FoodCollection.jsx";
import SearchRes from "./pages/search_restaurant/SearchRes.jsx";
import ResdetailComp_searchmenu from "./components/restaurant info/ResdetailComp_searchmenu.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/menu" element={<Menu />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchRes />} />
        <Route path="/Foodcollections/:collectionid" element={<FoodCollection />} />
        <Route path="/restaurants/:resname/:resid" element={<ResdetailComp_searchmenu />} />
        <Route path="/restaurants/:resid" element={<RestaurantDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
