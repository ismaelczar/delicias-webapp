import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import type { Product as ProductType } from "@/types/Product";
import { Button } from "./ui/button";

export function Product({
	id,
	title,
	tag,
	description,
	price,
	imageUrl,
	quantityDisponible,
}: ProductType) {
	const { addProductToCart, removeProductFromCart, cart } =
		useContext(CartContext);

	return (
		<div
			key={id}
			className="rounded-tr-3xl rounded-bl-3xl shadow-md p-4 flex flex-col items-center text-center bg-primary-foreground border border-muted"
		>
			<img
				src={imageUrl}
				alt={title}
				className="w-full h-48 mb-2 rounded-2xl object-cover"
			/>

			<div className="flex items-center gap-2">
				{/** biome-ignore lint/complexity/useOptionalChain: <explanaation> */}
				{tag &&
					tag.map((t, index) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanaation>
							key={index}
							className="text-xs text-yellow-600 font-semibold px-2 py-1 rounded-full bg-yellow-100 mb-2"
						>
							{t}
						</span>
					))}
			</div>

			<h2 className="text-lg font-bold mb-1">{title}</h2>
			<p className="text-sm text-gray-500 mb-4">{description}</p>

			<div className="flex items-center justify-between w-full mt-auto px-10">
				<div className="flex items-center gap-1">
					<span>R$</span>
					<span className="font-bold text-3xl">{price}</span>
				</div>

				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1 bg-primary rounded-md px-2 py-1">
						<Button
							variant="ghost"
							className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-md p-0 hover:bg-gray-200"
							onClick={() => id && removeProductFromCart(id)}
						>
							-
						</Button>
						<span className="w-6 text-center text-white">
							{cart.find((p) => p.id === id)?.quantity ?? 0}
						</span>
						<Button
							variant="ghost"
							className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-md p-0 hover:bg-gray-200"
							onClick={() =>
								addProductToCart({
									id,
									title,
									tag,
									description,
									price,
									imageUrl,
									quantityDisponible,
								})
							}
						>
							+
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
