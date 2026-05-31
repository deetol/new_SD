<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

trait LogsAdminActions
{
    /**
     * Log admin action for audit trail.
     *
     * @param  string  $action  e.g., 'created', 'updated', 'deleted'
     * @param  string  $resource  e.g., 'teacher', 'gallery', 'ppdb'
     * @param  mixed  $resourceId
     * @param  Request|null  $request
     * @param  array  $additionalData
     */
    protected function logAdminAction(
        string $action,
        string $resource,
        mixed $resourceId,
        ?Request $request = null,
        array $additionalData = []
    ): void {
        $request = $request ?? request();
        $user = $request->user();

        $logData = [
            'action' => $action,
            'resource' => $resource,
            'resource_id' => $resourceId,
            'user_id' => $user?->id,
            'user_email' => $user?->email,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp' => now()->toIso8601String(),
        ];

        if (!empty($additionalData)) {
            $logData['additional_data'] = $additionalData;
        }

        Log::channel('single')->info('Admin Action', $logData);
    }
}
