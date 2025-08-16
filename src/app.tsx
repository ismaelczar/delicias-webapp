import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { Catalog } from "./pages/Catalog";

export function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Catalog />} index />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	);
}
