import { useState } from "react";
import { addProduct } from "../services/productService";

export default function AdminPage() {
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [quantityDisponible, setQuantityDisponible] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const tagArray = tags
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag);

		const newProduct = {
			title,
			tag: tagArray,
			description,
			price: parseFloat(price),
			quantityDisponible: parseInt(quantityDisponible, 10),
			imageUrl: "https://via.placeholder.com/300", // até implementar upload
		};

		try {
			await addProduct(newProduct);
			alert("Produto adicionado com sucesso!");

			// Limpar o formulário
			setTitle("");
			setTags("");
			setDescription("");
			setPrice("");
			setQuantityDisponible("");
		} catch (error) {
			alert("Erro ao adicionar produto. Verifique o console.");
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Título"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Tags (separadas por vírgula)"
				value={tags}
				onChange={(e) => setTags(e.target.value)}
			/>
			<textarea
				placeholder="Descrição"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Preço"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Quantidade disponível"
				value={quantityDisponible}
				onChange={(e) => setQuantityDisponible(e.target.value)}
				required
			/>
			{/* Upload de imagem: implementar depois */}
			<button type="submit">Adicionar Produto</button>
		</form>
	);
}
