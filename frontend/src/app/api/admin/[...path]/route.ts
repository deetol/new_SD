/**
 * Proxy route: /api/admin/[...path] → Laravel API
 *
 * Semua request dari client components dikirim ke sini.
 * Route ini berjalan di server (Node.js), sehingga bisa membaca
 * httpOnly cookie dan meneruskan Bearer token ke Laravel.
 */

import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEY } from "@/lib/auth";

const LARAVEL_API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function proxyRequest(request: NextRequest, params: { path: string[] }) {
  const token = request.cookies.get(TOKEN_KEY)?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
  }

  // Rekonstruksi path dan query string
  const apiPath = params.path.join("/");
  const search  = request.nextUrl.search ?? "";
  const url     = `${LARAVEL_API}/${apiPath}${search}`;

  // Forward headers — kecuali host
  const forwardHeaders: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  const contentType = request.headers.get("content-type");
  if (contentType) {
    // Untuk multipart/form-data, WAJIB forward Content-Type beserta boundary-nya
    // agar Laravel bisa mem-parse body dengan benar.
    // Untuk JSON dan lainnya, forward apa adanya.
    forwardHeaders["Content-Type"] = contentType;
  }

  const body = ["GET", "HEAD"].includes(request.method) ? undefined : request.body;

  const laravelRes = await fetch(url, {
    method:  request.method,
    headers: forwardHeaders,
    body,
    // @ts-expect-error — duplex diperlukan untuk streaming body di Node 18+
    duplex: "half",
  });

  const data = await laravelRes.json().catch(() => ({}));

  return NextResponse.json(data, { status: laravelRes.status });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxyRequest(request, await params);
}
