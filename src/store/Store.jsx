import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./CartSlice";
import locationreducer from "./locationSlice";

const foodStore = configureStore({
  reducer: {
    mycart: cartreducer,
    location: locationreducer,
  },
});
export default foodStore; // ✅ export store
