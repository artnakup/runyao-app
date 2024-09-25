import type { NextApiRequest, NextApiResponse } from "next";
import { readSheet } from "../../lib/googleSheets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  try {
    // If no query is provided, return an empty result set
    if (!query || (query as string).trim() === '') {
        return res.status(200).json({ results: [] });
    }

    const range = `A4:G1000`; // Adjust as needed
    const data = await readSheet(range);

    // Filter out empty rows and perform the search
    const filteredData = data.filter(row => 
        row.some(cell => cell.trim() !== '') && // Check if the row is not empty
        row.some(cell => cell.toLowerCase().includes((query as string).toLowerCase())) // Perform search
    );

    res.status(200).json({ results: filteredData });
} catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
}
}
