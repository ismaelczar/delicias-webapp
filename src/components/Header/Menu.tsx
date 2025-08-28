import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Menu() {
	const { user, logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Erro ao deslogar:", error);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="sm" className="relative">
					<User />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				{user?.email === import.meta.env.VITE_EMAIL_USER ? (
					<div>
						<DropdownMenuLabel className="text-primary">
							Produtos
						</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link to="/cadastrar-novo-produto">Cadastrar Produto</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>Alterar Produto</DropdownMenuItem>
						</DropdownMenuGroup>
					</div>
				) : (
					<div>
						<DropdownMenuLabel className="text-primary">
							Perfil
						</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem>Histórico</DropdownMenuItem>
							<DropdownMenuItem>Alterar Senha</DropdownMenuItem>
						</DropdownMenuGroup>
					</div>
				)}
				<DropdownMenuSeparator />

				<button
					type="button"
					className="w-full text-primary"
					onClick={handleLogout}
				>
					<DropdownMenuItem>Sair</DropdownMenuItem>
				</button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
