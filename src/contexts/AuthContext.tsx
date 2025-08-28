import { onAuthStateChanged, type User } from "firebase/auth";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { auth } from "@/firebase";
import { fazerLogin, fazerLogout, registrarNovoUsuario } from "@/services/auth";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: typeof fazerLogin;
	register: typeof registrarNovoUsuario;
	logout: typeof fazerLogout;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// onAuthStateChanged é um observador que notifica sobre mudanças no estado de auth.
		// Ele também é executado na inicialização, verificando se há uma sessão ativa.
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false); // Finaliza o carregamento após a verificação inicial
		});

		// A função de limpeza do useEffect cancela a inscrição no observador
		// quando o componente é desmontado, evitando vazamentos de memória.
		return () => unsubscribe();
	}, []);

	const value = {
		user,
		loading,
		login: fazerLogin,
		register: registrarNovoUsuario,
		logout: fazerLogout,
	};

	// Não renderiza os filhos até que a verificação inicial de auth seja concluída.
	// Isso evita um "flash" da tela de login para um usuário já autenticado.
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
}
