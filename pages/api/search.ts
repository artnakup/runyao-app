import type { NextApiRequest, NextApiResponse } from "next";
import { readSheet } from "../../lib/googleSheets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;

  try {
    // If no query is provided or query length is less than 2 characters, return an empty result set
    if (!query || (query as string).trim().length < 2) {
      return res.status(200).json({ results: [] });
    }

    const range = `A4:G1000`; // Adjust as needed
    const data = await readSheet(range);

    // Filter rows that are not empty and where the second column (column B) contains the query
    const filteredData = data.filter(
      (row) =>
        row[1] && // Ensure column B exists
        row[1].trim() !== "" && // Ensure column B is not empty
        row[1].toLowerCase().includes((query as string).toLowerCase()) // Perform search in column B
    );

    res.status(200).json({ results: filteredData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
