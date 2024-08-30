import { google } from 'googleapis';

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const googleSheetId = process.env.GOOGLE_SHEET_ID;
const googleSheetPage = process.env.GOOGLE_SHEET_PAGE;

if (!clientEmail || !privateKey || !googleSheetId || !googleSheetPage) {
    throw new Error('Missing Google Sheets API credentials');
}

const googleAuth = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey,
    ['https://www.googleapis.com/auth/spreadsheets']
);

export async function readSheet(range: string) {
    try {
        const sheets = google.sheets({ version: 'v4', auth: googleAuth });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: googleSheetId,
            range: `${googleSheetPage}!${range}`,
        });
        return response.data.values || [];
    } catch (error) {
        console.error('Error reading Google Sheet:', error);
        throw error;
    }
}
