import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import LocalStorageMiddleware from "./middleware/LocalStorageMiddleware";
import orderSlice from "./reducers/orderReducer";
import cartSlice from "./reducers/cartReducer";

const rootReducer = combineReducers({
  order: orderSlice,
  cart: cartSlice,
});

const loadOrderState = () => {
  if (typeof window !== "undefined" && localStorage) {
    const storedOrderState = localStorage.getItem("orderState");
    return storedOrderState ? JSON.parse(storedOrderState) : undefined;
  }
};

const loadCartState = () => {
  if (typeof window !== "undefined" && localStorage) {
    const storedCartState = localStorage.getItem("cartState");
    return storedCartState ? JSON.parse(storedCartState) : undefined;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LocalStorageMiddleware),
  preloadedState: {
    order: loadOrderState(),
    cart: loadCartState(),
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
