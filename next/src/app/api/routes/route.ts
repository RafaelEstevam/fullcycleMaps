import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(`http://nestjs:4000/routes`, {
    next: {
      revalidate: 1000,
      tags: ["routes"],
    },
  });

  return NextResponse.json(await response.json());
}

export async function POST(request: Request) {
  const response = await fetch("http://nestjs:4000/routes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(await request.json()),
  });
  revalidateTag("routes");
  return NextResponse.json(await response.json());
}
