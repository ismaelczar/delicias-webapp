import { DialogTrigger } from "@radix-ui/react-dialog";
import { LogOut, Menu, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";
import { EmptyCartAlert } from "./EmptyCartAlert";
import { OrderSummary } from "./OrderSummary";
import { ProductModal } from "./ProductModal";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

export function Header() {
  const { cart } = useContext(CartContext);
  const { logout, user } = useAuth();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <header className="bg-background h-[60px] sm:h-[104px]">
      <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between p-4 border-b border-b-muted">
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-[40px] h-auto object-contain"
        />

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="relative">
                <ShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-ring text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </Button>
            </DialogTrigger>

            {cart.length === 0 ? <EmptyCartAlert /> : <OrderSummary />}
          </Dialog>
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <h2 className="text-sm font-bold  text-yellow-600">
                  Doces da Isa
                </h2>
              </SheetHeader>
              <div className="flex flex-col items gap-2 p-2 text-white">
                {user?.email === import.meta.env.VITE_EMAIL_USER ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="w-full">
                        Cadastrar Produto
                      </Button>
                    </DialogTrigger>
                    <ProductModal />
                  </Dialog>
                ) : null}

                <Button
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1 "
                >
                  <LogOut size={10} />
                  Sair
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
