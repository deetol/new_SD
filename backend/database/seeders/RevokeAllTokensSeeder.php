<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RevokeAllTokensSeeder extends Seeder
{
    /**
     * Emergency seeder to revoke all Sanctum tokens.
     * Use this if you suspect a security breach.
     *
     * Run with: php artisan db:seed --class=RevokeAllTokensSeeder
     */
    public function run(): void
    {
        $count = DB::table('personal_access_tokens')->count();
        
        DB::table('personal_access_tokens')->truncate();
        
        $this->command->warn("⚠️  SECURITY ACTION: All {$count} tokens have been revoked.");
        $this->command->info("All users must log in again.");
        $this->command->info("This action has been logged.");
        
        // Log the security action
        \Log::critical('SECURITY: All tokens revoked', [
            'tokens_revoked' => $count,
            'timestamp' => now()->toIso8601String(),
            'triggered_by' => 'RevokeAllTokensSeeder',
        ]);
    }
}
