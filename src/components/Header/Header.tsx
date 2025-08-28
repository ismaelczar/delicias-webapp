import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Cart } from "./Cart";
import { Menu } from "./Menu";

export function Header() {
	const { user } = useAuth();

	return (
		<header className="bg-background h-[60px] sm:h-[104px]">
			<div className="max-w-[1440px] mx-auto w-full flex items-center justify-between p-4 border-b border-b-muted">
				<img
					src="/logo1.png"
					alt="Logo"
					className="w-[40px] h-auto object-contain"
				/>

				<div className="flex items-center gap-2">
					<Cart />
					<div className="">
						{user ? (
							<Menu />
						) : (
							<Link to="/login">
								<Button size="sm">Faça seu login</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
