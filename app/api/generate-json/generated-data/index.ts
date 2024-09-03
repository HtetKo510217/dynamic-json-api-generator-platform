import { NextResponse } from 'next/server';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

type GeneratedData = {
  id: string;
  templateId: string;
  data: any;
};

type Data = {
  generatedData: GeneratedData[];
};

const adapter = new JSONFile<Data>('db.json');
const db = new Low<Data>(adapter, { generatedData: [] });

async function initializeDB() {
  await db.read();
}

initializeDB();

export async function GET() {
  const generatedData = db.data.generatedData;
  return NextResponse.json(generatedData);
}
