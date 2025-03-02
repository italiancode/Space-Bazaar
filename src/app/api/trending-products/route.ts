import handleTrendingProducts from "@/utils/trending-products";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("Request received:", req.method);

  try {
    const trendingProducts = await handleTrendingProducts(); // Ensure this function is correctly defined
    return NextResponse.json({ trendingProducts }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
