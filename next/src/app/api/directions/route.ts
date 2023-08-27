import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const origin_id = url.searchParams.get("originId");
  const destination_id = url.searchParams.get("destinationId");
  const response = await fetch(
    `http://nestjs:4000/directions?originId=${origin_id}&destinationId=${destination_id}`,
    {
      next: {
        revalidate: 1000,
      },
    }
  );

  return NextResponse.json(await response.json());
}
