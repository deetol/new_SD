<?php

namespace App\Http\Traits;

use Illuminate\Support\Str;

trait SanitizesInput
{
    /**
     * Sanitize HTML input to prevent XSS attacks.
     * Strips all HTML tags except safe formatting tags.
     *
     * @param  string|null  $input
     * @param  bool  $allowBasicFormatting  Allow <b>, <i>, <u>, <br>, <p>
     * @return string|null
     */
    protected function sanitizeHtml(?string $input, bool $allowBasicFormatting = false): ?string
    {
        if ($input === null) {
            return null;
        }

        if ($allowBasicFormatting) {
            // Allow only safe formatting tags
            $allowedTags = '<b><i><u><br><p><strong><em><ul><ol><li>';
            return strip_tags($input, $allowedTags);
        }

        // Strip all HTML tags
        return strip_tags($input);
    }

    /**
     * Sanitize array of HTML inputs.
     *
     * @param  array  $data
     * @param  array  $fields  Fields to sanitize
     * @param  bool  $allowBasicFormatting
     * @return array
     */
    protected function sanitizeFields(array $data, array $fields, bool $allowBasicFormatting = false): array
    {
        foreach ($fields as $field) {
            if (isset($data[$field]) && is_string($data[$field])) {
                $data[$field] = $this->sanitizeHtml($data[$field], $allowBasicFormatting);
            }
        }

        return $data;
    }

    /**
     * Generate a cryptographically secure random string.
     * More secure than Str::random() for sensitive use cases.
     *
     * @param  int  $length
     * @return string
     */
    protected function generateSecureToken(int $length = 32): string
    {
        return bin2hex(random_bytes($length / 2));
    }
}
