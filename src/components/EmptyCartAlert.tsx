import { ShoppingCart } from "lucide-react";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";

export function EmptyCartAlert() {
	return (
		<DialogContent className="flex flex-col justify-center items-center">
			<DialogHeader>
				<DialogTitle>
					<ShoppingCart size={60} className="text-primary" />
				</DialogTitle>
			</DialogHeader>
			<DialogDescription className="flex flex-col text-sm items-center">
				<strong className="text-2xl">Carrinho vazio...</strong>
				Adicione produtos antes de finalizar.
			</DialogDescription>
		</DialogContent>
	);
}
