import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export async function addProduct(product: any) {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
