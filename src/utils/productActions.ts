import {
  doc,
  updateDoc,
  increment,
  setDoc,
  deleteDoc,
 
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase";
// import { initializeProduct } from "@/lib/initializeProducts";
// import { useAuth } from "@/contexts/AuthContext";
// import { v4 as uuidv4 } from 'uuid';
import CryptoJS from "crypto-js";

export const handleLikeProduct = async (
  productId: number,
  currentUser: { uid: string } | null,
  liked: boolean,
  setLiked: (value: boolean) => void,
  setLikes: (value: number | ((prev: number) => number)) => void,
  userIp: string
) => {
  const productRef = doc(db, "products", productId.toString());
  const timestamp = new Date().toISOString();

  // Generate a guesthash based on user IP or currentUser UID
  const guesthash = currentUser
    ? currentUser.uid
    : CryptoJS.SHA256(userIp).toString();

  // Optimistically update UI
  setLiked(!liked);
  setLikes((prev) => (liked ? prev - 1 : prev + 1));

  try {
    if (currentUser) {
      const userLikeRef = doc(
        db,
        `products/${productId}/likes/${currentUser.uid}`
      );

      if (liked) {
        await updateDoc(productRef, { likes: increment(-1) });
        await deleteDoc(userLikeRef);
      } else {
        await updateDoc(productRef, { likes: increment(1) });
        await setDoc(userLikeRef, {
          timestamp,
          userId: currentUser.uid,
        });
      }
    } else {
      const guestLikeRef = doc(db, `products/${productId}/likes/${guesthash}`);
      const guestLikes = JSON.parse(localStorage.getItem("guestLikes") || "{}");

      if (liked) {
        delete guestLikes[productId];
        await updateDoc(productRef, { likes: increment(-1) });
      } else {
        guestLikes[productId] = { timestamp };
        await updateDoc(productRef, { likes: increment(1) });
        await setDoc(guestLikeRef, {
          timestamp,
          userId: guesthash,
        });
      }

      localStorage.setItem("guestLikes", JSON.stringify(guestLikes));
    }
  } catch (error) {
    // Revert UI on error
    setLiked(liked);
    setLikes((prev) => (liked ? prev + 1 : prev - 1));
    console.error("Error updating likes:", error);
  }
};

export const handleShareProduct = async (
  productId: number,
  currentUser: { uid: string } | null,
  shared: boolean,
  setShares: (value: number | ((prev: number) => number)) => void
) => {
  const productRef = doc(db, "products", productId.toString());
  const timestamp = new Date().toISOString();

  // Optimistically update UI
  setShares((prev) => prev + 1);

  try {
    if (currentUser) {
      const userLikeRef = doc(
        db,
        `products/${productId}/shares/${currentUser.uid}`
      );

      if (shared) {
        await updateDoc(productRef, { shares: increment(-1) });
        await deleteDoc(userLikeRef);
      } else {
        await updateDoc(productRef, { shares: increment(1) });
        await setDoc(userLikeRef, {
          timestamp,
          userId: currentUser.uid,
        });
      }
    } else {
      const guestShares = JSON.parse(
        localStorage.getItem("guestLikes") || "{}"
      );

      if (shared) {
        delete guestShares[productId];
        await updateDoc(productRef, { shares: increment(-1) });
      } else {
        guestShares[productId] = { timestamp };
        await updateDoc(productRef, { shares: increment(1) });
      }

      localStorage.setItem("guestShares", JSON.stringify(guestShares));
    }
  } catch (error) {
    // Revert UI on error
    setShares((prev) => prev - 1);
    console.error("Error updating shares:", error);
  }
};

export const handlePurchaseProduct = async (
  productId: number,
  currentUser: { uid: string } | null,
  purchased: boolean
  //   setPurchases: (value: number | ((prev: number) => number)) => void
) => {
  const productRef = doc(db, "products", productId.toString());
  const timestamp = new Date().toISOString();

  // Optimistically update UI
  //   setPurchases((prev) => prev + 1);

  try {
    if (currentUser) {
      const userLikeRef = doc(
        db,
        `products/${productId}/purchases/${currentUser.uid}`
      );

      if (purchased) {
        await updateDoc(productRef, { purchases: increment(-1) });
        await deleteDoc(userLikeRef);
      } else {
        await updateDoc(productRef, { purchases: increment(1) });
        await setDoc(userLikeRef, {
          timestamp,
          userId: currentUser.uid,
        });
      }
    } else {
      const guestPurchases = JSON.parse(
        localStorage.getItem("guestPurchases") || "{}"
      );

      if (purchased) {
        delete guestPurchases[productId];
        await updateDoc(productRef, { purchases: increment(-1) });
      } else {
        guestPurchases[productId] = { timestamp };
        await updateDoc(productRef, { purchases: increment(1) });
      }

      localStorage.setItem("guestPurchases", JSON.stringify(guestPurchases));
    }
  } catch (error) {
    // Revert UI on error
    // setPurchases((prev) => prev - 1);
    console.error("Error updating purchases:", error);
  }
};

export const getAllProducts = async () => {
  const productsCollection = collection(db, "products");
  const productSnapshot = await getDocs(productsCollection);
  const products = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};
