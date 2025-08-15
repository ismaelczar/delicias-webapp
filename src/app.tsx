import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Catalog } from "./pages/Catalog";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Catalog />} index />
			</Routes>
		</BrowserRouter>
	);
}
