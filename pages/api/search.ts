import type { NextApiRequest, NextApiResponse } from 'next';
import { readSheet } from '../../lib/googleSheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    try {
        const range = `A2:F1000`; // Adjust as needed
        const data = await readSheet(range);

        const filteredData = data.filter(row => row.some(cell => cell.toLowerCase().includes((query as string).toLowerCase())));

        res.status(200).json({ results: filteredData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
