import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const response = await fetch(`http://nestjs:4000/routes/route/${id}`, {
    next: {
      revalidate: 1000,
    },
  });

  return NextResponse.json(await response.json());
}
