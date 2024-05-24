/* eslint-disable @typescript-eslint/ban-types */
import { isAction, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const LocalStorageMiddleware: Middleware<{}, RootState> =
  (user) => (next) => (action) => {
    const state = user.getState();
    const result = next(action);

    if (isAction(action)) {
      if (
        action.type === "order/setOrder" ||
        action.type === "order/deleteOrder"
      ) {
        const orderState = user.getState().order;
        localStorage.setItem("orderState", JSON.stringify(orderState));
      }

      if (
        action.type === "cart/addItem" ||
        action.type === "cart/resetCart" ||
        action.type === "cart/removeItem" ||
        action.type === "cart/editItemQuantity" ||
        action.type === "cart/editItemExtras"
      ) {
        const cartState = user.getState().cart;
        localStorage.setItem("cartState", JSON.stringify(cartState));
      }
    }

    return result;
  };

export default LocalStorageMiddleware;
