import path from "path"
import { NextResponse } from 'next/server';
import fs from "fs"

const DATA_PATH = path.join(process.cwd(), "src", "utils", "data.csv")

const parseCSV = (csvContent: any) => {
    return csvContent.split('\n').map((row: any) => {
        const [createdAt, filename] = row.split(';');
        return { createdAt: new Date(createdAt), filename: filename.trim() };
    });
};



export async function GET() {
    try {
        const fileContent = fs.readFileSync(DATA_PATH, 'utf-8');
        const items = parseCSV(fileContent);
        return NextResponse.json(items);

    } catch (error) {
        console.log(error)
    }
}