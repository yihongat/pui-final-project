import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUrl = req.body;
  const headerOptions = {
    method: "GET",
  };
  try {
    const image = await fetch(imageUrl, headerOptions);
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json(error);
  }
}
