const API_KEY = process.env.YOUTUBE_API_KEY;

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const url = `https://youtube.googleapis.com/youtube/v3/channels?part=topicDetails,statistics,status,snippet,localizations,contentDetails,id,brandingSettings&id=${id}&key=${API_KEY}`;
  try {
    const resp = await (await fetch(url, {})).json();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
  }
}
