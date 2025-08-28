import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { EmptyCartAlert } from "./modals/EmptyCartAlert";
import { OrderSummary } from "./modals/OrderSummary";

export function Cart() {
	const { cart } = useContext(CartContext);

	const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
	return (
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
	);
}
