import { NextRequest, NextResponse } from "next/server";
import { getMeApi } from "@/lib/api";
import { TOKEN_KEY } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
  }

  try {
    const user = await getMeApi(token);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: "Token tidak valid atau sudah kedaluwarsa." }, { status: 401 });
  }
}
