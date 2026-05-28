<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * POST /api/auth/login
     *
     * Body: { email, password }
     * Returns: { user, token }
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        /** @var \App\Models\User $user */
        $user  = Auth::user();
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    /**
     * POST /api/auth/logout
     *
     * Header: Authorization: Bearer {token}
     * Revokes the current token.
     */
    public function logout(Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }

    /**
     * GET /api/auth/me
     *
     * Header: Authorization: Bearer {token}
     * Returns authenticated user data.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}
