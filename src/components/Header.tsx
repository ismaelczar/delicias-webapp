import { MapPin, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
	return (
		<header className="bg-background  h-[60px] sm:h-[104px]">
			<div className="max-w-[1440px] mx-auto w-full flex items-center justify-between p-4 border-b">
				<span className="text-xl font-semibold">Delícias da Isa</span>
				<div className="flex items-center gap-1">
					<Button size={"sm"} variant={"secondary"} className="text-violet-800">
						<MapPin />
						Água Branca - PB
					</Button>
					<Button size={"sm"}>
						<ShoppingCart />
					</Button>
				</div>
			</div>
		</header>
	);
}
