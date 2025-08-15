import { ShoppingCart } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import temporaryData from "@/data/data.json";

export function Catalog() {
	return (
		<>
			<Header />
			<main className="max-w-[1440px] mx-auto w-full p-4">
				<h1 className="text-2xl font-bold py-6">Nossas Delícias</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{temporaryData.map((product) => (
						<div
							key={product.id}
							className="rounded-tr-3xl rounded-bl-3xl shadow-md p-4 flex flex-col items-center text-center bg-card"
						>
							<img
								src={product.foto}
								alt={product.titulo}
								className="w-[120px] h-[120px] mb-2 rounded-2xl "
							/>
							<span className="text-xs text-yellow-600 font-semibold px-2 py-1 rounded-full bg-yellow-100 mb-2">
								{product.etiqueta}
							</span>
							<h2 className="text-lg font-bold mb-1">{product.titulo}</h2>
							<p className="text-sm text-gray-500 mb-4">{product.descricao}</p>
							<div className="flex items-center justify-between w-full mt-auto px-10">
								<div className="flex items-center gap-1">
									<span>R$</span>
									<span className="font-bold text-2xl">{product.preco}</span>
								</div>
								<div className="flex items-center gap-2">
									<Button className="bg-gray-200 px-2 rounded">-</Button>
									<span>1</span>
									<Button className="bg-gray-200 px-2 rounded">+</Button>
									<Button
										variant={"secondary"}
										size={"lg"}
										className="text-white "
									>
										<ShoppingCart />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</>
	);
}
