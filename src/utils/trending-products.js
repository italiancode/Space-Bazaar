import { calculateScore } from "@/utils/scoreCalculator";
import { getAllProducts } from "@/utils/productActions"; // Assuming you have a function to get all products
// 
const handleTrendingProducts = async() => {
    try {
        const products = await getAllProducts();

        if (products) {
            if (!Array.isArray(products)) {
                throw new Error("Expected an array of products");
            }

            const productsWithScores = products
                .map((product) => {
                    if (
                        product.purchases > 0 ||
                        product.shares > 0 ||
                        product.likes > 0
                    ) {
                        return {
                            ...product,
                            score: calculateScore(product), // Calculate score only for valid products
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            const trendingProducts = productsWithScores.sort(
                (a, b) => b.score - a.score
            );

            return {
                status: 200,
                body: trendingProducts,
            };
        } else {
            throw new Error("No products found");
        }
    } catch (error) {
        console.error("Error fetching trending products:", error); // Log the error
        throw new Error("Response object is undefined");
    }
};

export default handleTrendingProducts;