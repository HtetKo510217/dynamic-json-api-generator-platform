import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { templateId: string; id: string } }
) {
  const { id } = params;

  try {
    const generatedData = await prisma.generatedData.findUnique({
      where: { id },
    });

    if (!generatedData) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json(generatedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  const { templateId } = params;
  const data = await request.json();

  try {
    const newGeneratedData = await prisma.generatedData.create({
      data: {
        templateId,
        data: data.data, // Assuming `data` is the JSON structure you want to store
      },
    });

    return NextResponse.json(newGeneratedData, { status: 201 });
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { templateId: string; id: string } }
) {
  const { id } = params;
  const data = await request.json();

  try {
    const updatedGeneratedData = await prisma.generatedData.update({
      where: { id },
      data: {
        data: data.data, // Assuming `data` is the JSON structure you want to update
      },
    });

    return NextResponse.json(updatedGeneratedData);
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { templateId: string; id: string } }
) {
  const { id } = params;

  try {
    await prisma.generatedData.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
