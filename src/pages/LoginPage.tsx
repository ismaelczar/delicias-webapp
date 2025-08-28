import type { AuthError } from "firebase/auth";
import { ArrowLeft } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import {
	fazerLogin,
	registrarNovoUsuario,
	traduzirErroAuth,
} from "../services/auth";

const LoginPage: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError(null);
		setLoading(true);

		try {
			if (isLogin) {
				await fazerLogin(email, password);
			} else {
				await registrarNovoUsuario(email, password);
			}
		} catch (e) {
			const authError = e as AuthError;
			setError(traduzirErroAuth(authError.code));
		} finally {
			setLoading(false);
		}
	};

	const toggleFormMode = () => {
		setIsLogin((prevIsLogin) => !prevIsLogin);
		setError(null);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-muted/20">
			<Card className="w-[350px] shadow-md">
				<CardHeader>
					<Link to="/" className="text-primary mb-4 inline-block">
						<ArrowLeft />
					</Link>
					<CardTitle className="text-center text-2xl font-bold">
						{isLogin ? "Login" : "Criar Conta"}
					</CardTitle>
					<CardDescription className="text-center">
						{isLogin
							? "Acesse sua conta para continuar"
							: "Preencha os dados para se cadastrar"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="flex flex-col gap-3">
						{error && (
							<p role="alert" className="text-sm text-red-500 text-center">
								{error}
							</p>
						)}
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="E-mail"
							required
						/>
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Senha"
							required
							minLength={6}
						/>
						<Button
							type="submit"
							disabled={loading}
							className="bg-destructive hover:bg-destructive/90 text-white font-semibold mt-2"
						>
							{loading ? "Carregando..." : isLogin ? "Entrar" : "Registrar"}
						</Button>
					</form>
					<button
						type="button"
						onClick={toggleFormMode}
						className="w-full text-sm text-destructive mt-4 underline hover:opacity-80"
					>
						{isLogin ? "Registre-se" : "Faça login"}
					</button>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
