import { Extra } from "@/components/ProductsModal";
import { MenuItem } from "@/types/Restaurant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// create a type that extends MenuItem and adds an quantity property
export type CartItem = MenuItem & { quantity: number; allExtras: Extra[] };

interface InitialStateType {
  items: CartItem[];
}

const initialState: InitialStateType = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      state.items.push(newItem);
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    resetCart: (state) => {
      state.items = [];
    },
    editItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      state.items = state.items.map((item) =>
        item._id === id ? { ...item, quantity } : item
      );
    },
    editItemExtras: (
      state,
      action: PayloadAction<{ id: string; extras: Extra[]; newPrice: number }>
    ) => {
      const { id, extras, newPrice } = action.payload;
      state.items = state.items.map((item) =>
        item._id === id ? { ...item, extras, price: newPrice } : item
      );
    },
  },
});

export const { addItem, removeItem, resetCart, editItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
