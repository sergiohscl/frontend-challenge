import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import type { CartNFT } from "@/components/DesktopCartNFTs";
import { cartItems } from "@/mocks/data/cartItem";

const CART_STORAGE_KEY = "kurio-cart";

type CartAction =
  | { type: "SET_ITEMS"; payload: CartNFT[] }
  | { type: "ADD_ITEM"; payload: CartNFT }
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "UPDATE_QUANTITY";
      payload: { id: string; quantity: number };
    }
  | { type: "CLEAR_CART" };

interface CartContextType {
  items: CartNFT[];
  cartCount: number;
  subtotal: number;
  setItems: (items: CartNFT[]) => void;
  addItem: (item: CartNFT) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

// Carrega os dados persistidos
function loadCart(): CartNFT[] {
  if (typeof window === "undefined") {
    return cartItems;
  }

  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    // Primeira visita: utiliza os mocks
    if (storedCart === null) {
      return cartItems;
    }

    const parsed: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CartNFT =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.tokenId === "string" &&
        typeof item.image === "string" &&
        typeof item.price === "number" &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1,
    );
  } catch {
    return [];
  }
}

function cartReducer(
  state: CartNFT[],
  action: CartAction,
): CartNFT[] {
  switch (action.type) {
    case "SET_ITEMS":
      return action.payload;

    case "ADD_ITEM": {
      const existingItem = state.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              }
            : item,
        );
      }

      return [...state, action.payload];
    }

    case "REMOVE_ITEM":
      return state.filter(
        (item) => item.id !== action.payload,
      );

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: Math.max(1, action.payload.quantity),
            }
          : item,
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, dispatch] = useReducer(
    cartReducer,
    undefined,
    loadCart,
  );

  // Salva sempre que o carrinho mudar
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items),
      );
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  }, [items]);

  const cartCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [items],
  );

  const value = useMemo<CartContextType>(
    () => ({
      items,
      cartCount,
      subtotal,

      setItems: (updatedItems) =>
        dispatch({
          type: "SET_ITEMS",
          payload: updatedItems,
        }),

      addItem: (item) =>
        dispatch({
          type: "ADD_ITEM",
          payload: item,
        }),

      removeItem: (id) =>
        dispatch({
          type: "REMOVE_ITEM",
          payload: id,
        }),

      updateQuantity: (id, quantity) =>
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { id, quantity },
        }),

      clearCart: () =>
        dispatch({
          type: "CLEAR_CART",
        }),
    }),
    [items, cartCount, subtotal],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser utilizado dentro de CartProvider",
    );
  }

  return context;
}
