import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Product as ProductComponent } from "@/components/Product";
import type { Product as ProductType } from "@/types/Product";

import { db } from "../firebase";

export function Catalog() {
	const [products, setProducts] = useState<ProductType[]>([]);

	const fetchProducts = async () => {
		const querySnapshot = await getDocs(collection(db, "products"));
		const data: ProductType[] = [];
		querySnapshot.forEach((doc) => {
			data.push({ id: doc.id, ...doc.data() } as ProductType);
		});
		setProducts(data);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<Header />
			<main className="max-w-[1440px] mx-auto w-full p-4">
				<h1 className="text-2xl font-bold py-6 text-yellow-600">
					Nossas Delícias
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<ProductComponent key={product.id} {...product} />
					))}
				</div>
			</main>
		</>
	);
}
