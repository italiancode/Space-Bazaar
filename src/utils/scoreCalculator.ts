import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase"; // Ensure you have your Firestore db instance
import { ProductInterface } from "@/types/ProductInterface";

const now = new Date(); // Current date
const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

export const calculateScore = async (product: ProductInterface) => {
  // Fetch likes, purchases, and shares for the product
  const [likes, purchases, shares] = await Promise.all([
    fetchLikes(product.id.toString()),
    fetchPurchases(product.id.toString()),
    fetchShares(product.id.toString()),
  ]);

  // Calculate recent counts
  const recentLikes = likes.length; // Count of likes fetched
  const recentPurchases = purchases.length; // Count of purchases fetched
  const recentShares = shares.length; // Count of shares fetched

  // Assign weights to each interaction
  const purchaseWeight = 3; // Purchases are most important
  const shareWeight = 2; // Shares are moderately important
  const likeWeight = 1; // Likes are least important

  // Calculate the total score
  const score =
    recentPurchases * purchaseWeight +
    recentShares * shareWeight +
    recentLikes * likeWeight;

  console.log(`Product ID: ${product.id}`);
  console.log("Likes in the last 24 hours:", likes.length);
  console.log("Purchases in the last 24 hours:", purchases.length);
  console.log("Shares in the last 24 hours:", shares.length);
  console.log("Score:", score);

  return score;
};

async function fetchLikes(productId: string) {
  try {
    // Reference to the `likes` subcollection under the specific product document
    const likesCollection = collection(db, "products", productId, "likes");

    // Create a query to get likes from the last 24 hours
    const likesQuery = query(
      likesCollection,
      where("timestamp", ">=", twentyFourHoursAgo.toISOString()) // Convert to ISO string
    );

    // Fetch all documents in the `likes` subcollection
    const querySnapshot = await getDocs(likesQuery);

    // // Check if there are any likes
    // if (querySnapshot.empty) {
    //   console.log("No likes found for this product in the last 24 hours.");
    //   return [];
    // }

    // Collect likes data
    const likesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return likesData;
  } catch (error) {
    console.error("Error fetching likes: ", error);
    return [];
  }
}

async function fetchPurchases(productId: string) {
  try {
    // Reference to the `purchases` subcollection under the specific product document
    const purchasesCollection = collection(
      db,
      "products",
      productId,
      "purchases"
    );

    // Create a query to get purchases from the last 24 hours
    const purchasesQuery = query(
      purchasesCollection,
      where("timestamp", ">=", twentyFourHoursAgo.toISOString()) // Convert to ISO string
    );

    // Fetch all documents in the `purchases` subcollection
    const querySnapshot = await getDocs(purchasesQuery);

    // // Check if there are any purchases
    // if (querySnapshot.empty) {
    //   console.log("No purchases found for this product in the last 24 hours.");
    //   return [];
    // }

    // Collect purchases data
    const purchasesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return purchasesData;
  } catch (error) {
    console.error("Error fetching purchases: ", error);
    return [];
  }
}

async function fetchShares(productId: string) {
  try {
    // Reference to the `shares` subcollection under the specific product document
    const sharesCollection = collection(db, "products", productId, "shares");

    // Create a query to get shares from the last 24 hours
    const sharesQuery = query(
      sharesCollection,
      where("timestamp", ">=", twentyFourHoursAgo.toISOString()) // Convert to ISO string
    );

    // Fetch all documents in the `shares` subcollection
    const querySnapshot = await getDocs(sharesQuery);

    // Check if there are any shares
    // if (querySnapshot.empty) {
    //   console.log("No shares found for this product in the last 24 hours.");
    //   return [];
    // }

    // Collect shares data
    const sharesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return sharesData;
  } catch (error) {
    console.error("Error fetching shares: ", error);
    return [];
  }
}
