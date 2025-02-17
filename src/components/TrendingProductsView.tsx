import React, { useEffect, useState } from "react";
import { ProductInterface } from "@/types/ProductInterface";

const TrendingProductsView = () => {
  const [trendingProducts, setTrendingProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch("/api/trending-products"); // Fetch from the API
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log("Data:", data);
        
        setTrendingProducts(data); // Adjust based on your response structure
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message); // Handle error
        } else {
            setError("An unknown error occurred."); // Fallback for unknown error types
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Trending Products</h1>
      <ul>
        {trendingProducts.length > 0 ? (
          trendingProducts.map((product) => (
            <li key={product.id}>
              {product.name} - Score: {product.score}
            </li>
          ))
        ) : (
          <li>No trending products available.</li>
        )}
      </ul>
    </div>
  );
};

export default TrendingProductsView;
