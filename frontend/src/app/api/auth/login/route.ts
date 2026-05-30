import { NextRequest, NextResponse } from "next/server";
import { loginApi } from "@/lib/api";
import { TOKEN_KEY } from "@/lib/auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email dan password wajib diisi." }, { status: 400 });
    }

    const { user, token } = await loginApi(email, password);

    const response = NextResponse.json({ user });

    // Set token sebagai httpOnly cookie — tidak bisa dibaca oleh JS di browser
    response.cookies.set(TOKEN_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login gagal.";
    return NextResponse.json({ message }, { status: 401 });
  }
}
