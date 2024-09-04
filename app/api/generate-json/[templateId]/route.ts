import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { templateId: string } }) {
  const { templateId } = params;

  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: { generatedDatas: true },
    });

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json(template.generatedDatas);
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  const { templateId } = params;
  const { data } = await request.json();
  console.log('data',data, templateId);
  try {
    const newGeneratedData = await prisma.generatedData.create({
      data: {
        id: uuidv4(),
        templateId,
        data,
      },
    });

    return NextResponse.json(newGeneratedData);
  } catch (error) {
    console.error("Error creating generated data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}