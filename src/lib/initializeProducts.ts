import { doc, setDoc, getDoc } from "firebase/firestore";
import products from "@/data/products.json";
import { db } from "@/config/firebase";

export async function initializeProduct(productId: number) {
  console.log("Initializing product", productId);
  const docRef = doc(db, "products", productId.toString());
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      await setDoc(docRef, {
        ...product,
        likes: 0,
        comments: 0,
        purchases: 0,
        shares: 0,
        ratings: 0,
        reviews: 0,
        category: product.category || "defaultCategory",
        dimensions: product.dimensions || "defaultDimensions",
        weight: product.weight || 0,
        featured: product.featured || false,
      });
    }
  }
}
