import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/types/Order";

interface InitialStateType {
  order: Order | null;
}

const initialState: InitialStateType = {
  order: {
    cartItems: [],
    createdAt: "",
    status: "inProgress",
    totalAmount: 0,
    userDetails: {
      email: "",
      name: "",
      phone: "0",
      address: "",
    },
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    deleteOrder: (state) => {
      state.order = null;
    },
  },
});

export const { setOrder, deleteOrder } = orderSlice.actions;

export default orderSlice.reducer;
