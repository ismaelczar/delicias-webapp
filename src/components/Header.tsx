import { DialogTrigger } from "@radix-ui/react-dialog";
import { Instagram, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { EmptyCartAlert } from "./EmptyCartAlert";
import { OrderSummary } from "./OrderSummary";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";

export function Header() {
	const { cart } = useContext(CartContext);

	const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<header className="bg-background h-[60px] sm:h-[104px]">
			<div className="max-w-[1440px] mx-auto w-full flex items-center justify-between p-4 border-b border-b-muted">
				<img
					src="/logo1.png"
					alt="Logo"
					className="w-[40px] h-auto object-contain"
				/>

				<div className="flex items-center gap-1">
					<Button size="sm" className="">
						<Instagram />
						<a
							href="https://www.instagram.com/docesdaisa_ofc?igsh=MTdlazE1YXRjdTA0MA=="
							target="_blank"
							rel="noopener noreferrer"
						>
							@docesdaisa_ofc
						</a>
					</Button>
					<Dialog>
						<DialogTrigger asChild>
							<Button size="sm" className="relative">
								<ShoppingCart />
								{cart.length > 0 && (
									<span className="absolute -top-2 -right-2 bg-ring text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
										{totalQuantity}
									</span>
								)}
							</Button>
						</DialogTrigger>

						{cart.length === 0 ? <EmptyCartAlert /> : <OrderSummary />}
					</Dialog>
				</div>
			</div>
		</header>
	);
}
