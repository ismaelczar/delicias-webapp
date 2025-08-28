import { useState } from "react";
import { addProduct } from "@/services/productService";
import { Button } from "./ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function ProductModal() {
	const [formData, setFormData] = useState({
		title: "",
		tag: "",
		description: "",
		price: "",
		quantityDisponible: "",
		imageUrl: "",
	});

	const [loading, setLoading] = useState(false);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		try {
			const newProduct = {
				...formData,
				tag: formData.tag.split(",").map((t) => t.trim()), // transforma string em array
			};
			await addProduct(newProduct);
			alert("Produto cadastrado com sucesso!");
			setFormData({
				title: "",
				tag: "",
				description: "",
				price: "",
				quantityDisponible: "",
				imageUrl: "",
			});
		} catch (error) {
			alert("Erro ao cadastrar produto. Veja o console.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="text-2xl font-bold text-foreground">
					Cadastrar Novo Produto
				</DialogTitle>
			</DialogHeader>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="title">Título</Label>

					{/** biome-ignore lint/correctness/useUniqueElementIds: disable> */}
					<Input
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Ex: Camiseta Básica"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="tag">Tags (separadas por vírgula)</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: disable> */}
					<Input
						id="tag"
						name="tag"
						value={formData.tag}
						onChange={handleChange}
						placeholder="ex: moda, camiseta, algodão"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="description">Descrição</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: disable> */}
					<Textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Digite uma descrição do produto"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="price">Preço</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: disable> */}
					<Input
						id="price"
						name="price"
						type="number"
						step="0.01"
						value={formData.price}
						onChange={handleChange}
						placeholder="Ex: 49.90"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="quantityDisponible">Quantidade Disponível</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: disable> */}
					<Input
						id="quantityDisponible"
						name="quantityDisponible"
						type="number"
						value={formData.quantityDisponible}
						onChange={handleChange}
						placeholder="Ex: 100"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="imageUrl">Imagem (URL)</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: disable> */}
					<Input
						id="imageUrl"
						name="imageUrl"
						type="url"
						value={formData.imageUrl}
						onChange={handleChange}
						placeholder="https://..."
						required
					/>
				</div>

				<DialogFooter>
					<Button
						type="submit"
						disabled={loading}
						className="bg-primary text-white font-semibold"
					>
						{loading ? "Cadastrando..." : "Cadastrar Produto"}
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}
