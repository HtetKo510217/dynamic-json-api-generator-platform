import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { data, slug } = await request.json();

  const dataArray = Array.isArray(data) ? data : [data];

  const newTemplate = await prisma.template.create({
    data: {
      id: uuidv4(),
      name: 'Generated Template',
      schema: dataArray[0], 
      slug: slug,
    },
  });

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

  // Generate the API endpoint using the slug
  const apiEndpoint = `/api/generate-json/${newTemplate.slug}`;

  return NextResponse.json({ apiEndpoint });
}
