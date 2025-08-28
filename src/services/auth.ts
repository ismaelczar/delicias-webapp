import {
  type AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/firebase"; // Importe sua instância do auth

/**
 * Registra um novo usuário com e-mail e senha.
 */
export async function registrarNovoUsuario(
  email: string,
  password: string
): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Registro bem-sucedido, o usuário já está logado.
    const user = userCredential.user;
    console.log("Usuário registrado com sucesso:", user);
    return user;
  } catch (error) {
    const errorCode = (error as AuthError).code;
    console.error("Erro ao registrar:", errorCode);
    throw new Error(traduzirErroAuth(errorCode)); // Lança o erro já traduzido
  }
}

/**
 * Realiza o login de um usuário existente.
 */
export async function fazerLogin(
  email: string,
  password: string
): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Login bem-sucedido.
    const user = userCredential.user;
    console.log("Usuário logado com sucesso:", user);
    return user;
  } catch (error) {
    const errorCode = (error as AuthError).code;
    console.error("Erro ao fazer login:", errorCode);
    throw new Error(traduzirErroAuth(errorCode)); // Lança o erro já traduzido
  }
}

/**
 * Desloga o usuário atual.
 */
export async function fazerLogout(): Promise<void> {
  try {
    await signOut(auth);
    console.log("Usuário deslogado com sucesso.");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}

/**
 * Traduz códigos de erro do Firebase Auth para mensagens amigáveis em português.
 */
export function traduzirErroAuth(codigoErro: string): string {
  switch (codigoErro) {
    case "auth/invalid-email":
      return "O e-mail fornecido não é válido.";
    case "auth/user-not-found":
      return "Usuário não encontrado. Verifique o e-mail e tente novamente.";
    case "auth/wrong-password":
      return "A senha está incorreta.";
    case "auth/email-already-in-use":
      return "Este e-mail já está sendo usado por outra conta.";
    case "auth/weak-password":
      return "A senha é muito fraca. A senha deve ter no mínimo 6 caracteres.";
    case "auth/too-many-requests":
      return "Muitas tentativas de login. Tente novamente mais tarde.";
    case "auth/network-request-failed":
      return "Erro de rede. Verifique sua conexão com a internet.";
    default:
      return "Ocorreu um erro inesperado. Tente novamente.";
  }
}
