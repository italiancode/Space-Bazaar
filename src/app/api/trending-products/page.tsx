import handleTrendingProducts from "@/utils/trending-products";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Request received:", req.method);
    await handleTrendingProducts(); // Fixed by removing the argument
    console.log("Response sent:", res);
}
