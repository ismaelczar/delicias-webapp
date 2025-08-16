import { Header } from "@/components/Header";
import { Product } from "@/components/Product";
import temporaryData from "../../data.json";

export function Catalog() {
	return (
		<>
			<Header />
			<main className="max-w-[1440px] mx-auto w-full p-4">
				<h1 className="text-2xl font-bold py-6 text-yellow-600">
					Nossas Delícias
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{temporaryData.map((product) => (
						<Product
							key={product.id}
							id={product.id}
							title={product.title}
							tag={product.tag}
							description={product.description}
							price={product.price}
							imageUrl={product.imageUrl}
						/>
					))}
				</div>
			</main>
		</>
	);
}
