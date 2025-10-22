import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest, 
    response: NextApiResponse
) {
    console.log(request.headers);
    response.status(200).json({ message: "Hello, World!" });
}
