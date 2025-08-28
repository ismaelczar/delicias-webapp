import { Route, Routes } from "react-router-dom";
import { Catalog } from "@/pages/Catalog";
import LoginPage from "@/pages/LoginPage";
import ProductPage from "@/pages/ProductPage";

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Catalog />} index />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/cadastrar-novo-produto" element={<ProductPage />} />
		</Routes>
	);
}
