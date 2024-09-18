import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { slug } = await request.json();

  try {
    const existingTemplate = await prisma.template.findUnique({
      where: { slug },
    });

    if (existingTemplate) {
      const suggestedSlug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
      return NextResponse.json({ available: false, suggestedSlug });
    }

    return NextResponse.json({ available: true });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
