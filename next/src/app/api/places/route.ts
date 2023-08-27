import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const text = url.searchParams.get("text");
  const response = await fetch(`http://nestjs:4000/places?text=${text}`, {
    next: {
      revalidate: 1000,
    },
  });

  return NextResponse.json(await response.json());
}
