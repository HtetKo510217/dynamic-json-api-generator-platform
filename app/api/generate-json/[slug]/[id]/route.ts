import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string; id: string } }
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

export async function PUT(
  request: Request,
  { params }: { params: { slug: string; id: string } }
) {
  const { slug, id } = params;
  const { data } = await request.json();

  try {
    const updatedGeneratedData = await prisma.generatedData.updateMany({
      where: { id, template: { slug } },
      data: { data },
    });

    if (updatedGeneratedData.count === 0) {
      return NextResponse.json(
        { error: "Generated data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Generated data updated successfully",
    });
  } catch (error) {
    console.error("Error updating generated data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string; id: string } }
) {
  const { slug, id } = params;

  try {
    const deletedGeneratedData = await prisma.generatedData.deleteMany({
      where: { id, template: { slug } },
    });

    if (deletedGeneratedData.count === 0) {
      return NextResponse.json(
        { error: "Generated data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Generated data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting generated data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
