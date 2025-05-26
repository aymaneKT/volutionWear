import { createContext } from "react";

import { Order } from "../components/UserProfile";

export const CartContext = createContext<{
  cart: Order[];
  setCart: (value: Order[]) => void;
}>({
  cart: [],
  setCart: () => {},
});

