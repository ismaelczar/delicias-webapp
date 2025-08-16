import { createContext, type ReactNode, useState } from "react";
import type { Product } from "@/types/Product";

interface CartItem extends Product {
	quantity: number;
}

interface CartContextType {
	cart: CartItem[];
	addProductToCart: (product: Product) => void;
	removeProductFromCart: (productId: number) => void;
}

export const CartContext = createContext<CartContextType>(
	{} as CartContextType,
);

interface CartProviderProps {
	children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
	const [cart, setCart] = useState<CartItem[]>([]);

	function addProductToCart(product: Product) {
		setCart((prev) => {
			const existingIndex = prev.findIndex((item) => item.id === product.id);

			if (existingIndex !== -1) {
				const updated = [...prev];
				updated[existingIndex] = {
					...updated[existingIndex],
					quantity: updated[existingIndex].quantity + 1,
				};
				return updated;
			}

			return [...prev, { ...product, quantity: 1 }];
		});
	}

	function removeProductFromCart(productId: number) {
		setCart((prev) => {
			const index = prev.findIndex((item) => item.id === productId);
			if (index === -1) return prev;

			const updated = [...prev];
			if (updated[index].quantity > 1) {
				updated[index] = {
					...updated[index],
					quantity: updated[index].quantity - 1,
				};
			} else {
				updated.splice(index, 1);
			}
			return updated;
		});
	}

	return (
		<CartContext.Provider
			value={{ cart, addProductToCart, removeProductFromCart }}
		>
			{children}
		</CartContext.Provider>
	);
}
