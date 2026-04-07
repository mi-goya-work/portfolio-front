import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const tag = body.tag;
  if (typeof tag !== "string") {
    return NextResponse.json({ message: "Missing tag" }, { status: 400 });
  }

  revalidateTag(tag, "max");

  return NextResponse.json({ revalidated: true, tag });
}
