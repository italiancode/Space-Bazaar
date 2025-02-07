import { doc, setDoc, getDoc } from "firebase/firestore";
import products from "@/products.json";
import { db } from "@/config/firebase";

export async function initializeProduct(productId: number) {
  const docRef = doc(db, "products", productId.toString());
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      await setDoc(docRef, {
        ...product,
        likes: 0,
        comments: 0,
      });
    }
  }
}
