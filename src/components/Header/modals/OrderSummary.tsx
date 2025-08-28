import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Button } from "../../ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";

export function OrderSummary() {
	const { cart } = useContext(CartContext);

	const sendCartToWhatsApp = () => {
		const phone = "5583996152410";

		if (cart.length === 0) {
			return;
		}

		const itemsMessage = cart
			.map(
				(item) =>
					`• ${item.title} (x${item.quantity}) - R$ ${(
						item.price * item.quantity
					).toFixed(2)}`,
			)
			.join("\n");

		const message = `Olá, tenho interesse nos seguintes produtos:\n\n${itemsMessage}\n\n`;

		const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

		window.location.href = url;
	};

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="text-2xl font-bold text-foreground">
					Detalhes do Pedido
				</DialogTitle>
				<DialogDescription className="flex flex-col">
					<span className="text-xs mb-6">
						O pedido será enviado para o nosso WhatsApp, onde você poderá
						acompanhar todo o processo.
					</span>
					{cart.map((item) => (
						<div
							key={item.id}
							className="flex justify-between mt-1 text-foreground font-semibold"
						>
							<span className="flex items-center justify-between">
								{item.title} (x{item.quantity})
							</span>
							<span>R$ {(item.price * item.quantity).toFixed(2)}</span>
						</div>
					))}
					<span className="font-bold mt-10">
						Total:{" "}
						{new Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(total)}
					</span>
				</DialogDescription>

				<DialogFooter>
					<Button
						onClick={sendCartToWhatsApp}
						variant={"outline"}
						className="bg-primary border-none text-white font-semibold mt-3"
					>
						Finalizar pedido
					</Button>
				</DialogFooter>
			</DialogHeader>
		</DialogContent>
	);
}
