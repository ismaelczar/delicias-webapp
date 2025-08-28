import { Route, Routes } from "react-router-dom";
import { Catalog } from "@/pages/Catalog";
import LoginPage from "@/pages/LoginPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} index />

			<Route element={<ProtectedRoute />}>
				<Route path="/catalogo" element={<Catalog />} />
			</Route>
		</Routes>
	);
}
