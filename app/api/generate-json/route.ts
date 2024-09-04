import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { generateJson } from 'dynamic-json-generator';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { data } = await request.json();

  // Ensure data is always an array
  const dataArray = Array.isArray(data) ? data : [data];

  const newTemplate = await prisma.template.create({
    data: {
      id: uuidv4(),
      name: 'Generated Template',
      schema: dataArray[0], // We use the first item as the template schema
    },
  });

  // Create generatedData entries for each item in dataArray
  const generatedDataPromises = dataArray.map(item => 
    prisma.generatedData.create({
      data: {
        id: uuidv4(),
        templateId: newTemplate.id,
        data: item,
      },
    })
  );

  await Promise.all(generatedDataPromises);

  const apiEndpoint = `/api/generate-json/${newTemplate.id}`;

  return NextResponse.json({ apiEndpoint });
}