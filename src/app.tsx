import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import { AppRouter } from "./routes/index.tsx";

export function App() {
	return (
		<AuthProvider>
			<CartProvider>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</CartProvider>
		</AuthProvider>
	);
}
