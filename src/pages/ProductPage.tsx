import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/firebase";
import { addProduct } from "@/services/productService";

export default function ProductPage() {
	const [formData, setFormData] = useState({
		title: "",
		tag: "",
		description: "",
		price: "",
		quantityDisponible: "",
	});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

		if (!selectedFile) {
			alert("Por favor, selecione uma imagem para o produto.");
			return;
		}

		setLoading(true);

		try {
			// Upload da imagem para Firebase Storage
			const storageRef = ref(storage, `products/${selectedFile.name}`);
			const uploadTask = uploadBytesResumable(storageRef, selectedFile);

			const imageUrl = await new Promise<string>((resolve, reject) => {
				uploadTask.on(
					"state_changed",
					null,
					(error) => reject(error),
					() => {
						getDownloadURL(uploadTask.snapshot.ref)
							.then((url) => resolve(url))
							.catch((err) => reject(err));
					},
				);
			});

			const newProduct = {
				...formData,
				tag: formData.tag.split(",").map((t) => t.trim()),
				price: parseFloat(formData.price),
				quantityDisponible: parseInt(formData.quantityDisponible, 10),
				imageUrl,
			};

			await addProduct(newProduct);
			alert("Produto cadastrado com sucesso!");

			setFormData({
				title: "",
				tag: "",
				description: "",
				price: "",
				quantityDisponible: "",
			});
			setSelectedFile(null);
		} catch (error) {
			alert("Erro ao cadastrar produto. Veja o console.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
			<Link to="/" className="text-primary mb-4 inline-block">
				<ArrowLeft />
			</Link>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-3xl font-bold text-center mb-6">
					Cadastrar Novo Produto
				</h2>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="title">Título</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
					<Input
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Ex: Doce de Leite"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="tag">Etiquetas (separadas por vírgula)</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
					<Input
						id="tag"
						name="tag"
						value={formData.tag}
						onChange={handleChange}
						placeholder="ex: Gourmet, Especial, Vegano"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="description">Descrição</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
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
					{/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
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
					{/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
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
					<Label htmlFor="image">Imagem do Produto</Label>
					{/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
					<Input
						id="image"
						name="image"
						type="file"
						accept="image/*"
						onChange={(e) => {
							if (e.target.files && e.target.files[0]) {
								setSelectedFile(e.target.files[0]);
							}
						}}
						required
					/>
				</div>

				<Button
					type="submit"
					disabled={loading}
					className="bg-primary text-white font-semibold"
				>
					{loading ? "Cadastrando..." : "Cadastrar Produto"}
				</Button>
			</form>
		</div>
	);
}
