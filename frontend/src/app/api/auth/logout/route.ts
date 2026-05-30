import { NextRequest, NextResponse } from "next/server";
import { logoutApi } from "@/lib/api";
import { TOKEN_KEY } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value;

  // Revoke token di backend (best-effort — tidak gagalkan logout jika error)
  if (token) {
    await logoutApi(token).catch(() => {});
  }

  const response = NextResponse.json({ message: "Logged out." });

  // Hapus cookie
  response.cookies.set(TOKEN_KEY, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
