// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute() {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Carregando...</div>;
	}

	if (!user) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
