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

            // Filter products first, then map to calculate scores
            const validProducts = products.filter(product =>
                product.purchases > 0 || product.shares > 0 || product.likes > 0
            );

            const productsWithScores = await Promise.all(validProducts.map(async(product) => {
                return {
                    ...product,
                    score: await calculateScore(product), // Await the score calculation
                };
            }));

            console.log(productsWithScores);

            // Sort products by highest score
            const trendingProducts = productsWithScores.sort(
                (a, b) => b.score - a.score // Highest score first
            );

            return {
                status: 200,
                body: trendingProducts, // Return the ranked products
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