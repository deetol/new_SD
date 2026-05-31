# Security Quick Reference Card

Quick guide for developers working on this project.

---

## 🛡️ When Adding New Features

### 1. Input Validation
```php
// Always validate input
$validated = $request->validate([
    'field' => 'required|string|max:255',
]);
```

### 2. HTML Sanitization
```php
use App\Http\Traits\SanitizesInput;

class YourController extends Controller
{
    use SanitizesInput;
    
    public function store(Request $request)
    {
        $validated = $request->validated();
        
        // Sanitize HTML fields
        $validated = $this->sanitizeFields(
            $validated,
            ['description', 'content'],
            allowBasicFormatting: true  // or false to strip all HTML
        );
    }
}
```

### 3. File Uploads
```php
use App\Http\Traits\HandlesImageUpload;

class YourController extends Controller
{
    use HandlesImageUpload;
    
    public function store(Request $request)
    {
        // Validate first
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);
        
        // Upload with secure filename
        $path = $this->uploadImage($request->file('image'), 'folder-name');
    }
}
```

### 4. Rate Limiting
```php
// In routes/api.php
Route::post('endpoint', [Controller::class, 'method'])
    ->middleware('throttle:10,1'); // 10 requests per minute
```

### 5. Audit Logging
```php
use App\Http\Traits\LogsAdminActions;

class YourController extends Controller
{
    use LogsAdminActions;
    
    public function destroy($id)
    {
        $resource = Model::findOrFail($id);
        $resource->delete();
        
        // Log the action
        $this->logAdminAction('deleted', 'resource_name', $id, additionalData: [
            'name' => $resource->name,
        ]);
    }
}
```

---

## 🚫 Security Don'ts

### ❌ Never Do This:
```php
// DON'T: Raw SQL with user input
DB::select("SELECT * FROM users WHERE email = '{$request->email}'");

// DON'T: Echo user input without sanitization
echo $request->input('content');

// DON'T: Store passwords in plain text
$user->password = $request->password;

// DON'T: Expose sensitive data in API responses
return response()->json($user); // includes password hash!

// DON'T: Use predictable IDs in URLs
route('resource.show', ['id' => 1]); // Use UUIDs or slugs instead
```

### ✅ Do This Instead:
```php
// DO: Use Eloquent ORM (parameterized queries)
User::where('email', $request->email)->first();

// DO: Sanitize output
echo $this->sanitizeHtml($request->input('content'));

// DO: Hash passwords
$user->password = Hash::make($request->password);

// DO: Use API Resources to control output
return new UserResource($user);

// DO: Use slugs or UUIDs
route('resource.show', ['slug' => $resource->slug]);
```

---

## 🔑 Authentication Patterns

### Protect Routes:
```php
// In routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::post('resource', [Controller::class, 'store']);
    Route::put('resource/{id}', [Controller::class, 'update']);
    Route::delete('resource/{id}', [Controller::class, 'destroy']);
});
```

### Check User in Controller:
```php
public function update(Request $request, $id)
{
    $user = $request->user(); // Get authenticated user
    
    // Check authorization
    if ($user->id !== $resource->user_id) {
        abort(403, 'Unauthorized');
    }
}
```

---

## 📝 Validation Rules Cheat Sheet

```php
'field' => 'required|string|max:255',
'email' => 'required|email|unique:users,email',
'password' => 'required|string|min:8|confirmed',
'age' => 'required|integer|min:18|max:100',
'url' => 'required|url',
'date' => 'required|date|after:today',
'file' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB
'image' => 'required|image|mimes:jpg,jpeg,png|max:2048', // 2MB
'status' => 'required|in:active,inactive,pending',
'tags' => 'nullable|array|max:10',
'tags.*' => 'string|max:50',
```

---

## 🧪 Testing Security

### Test Rate Limiting:
```bash
# Should fail on 6th attempt
for i in {1..6}; do curl -X POST http://localhost:8000/api/auth/login; done
```

### Test Authentication:
```bash
# Should return 401
curl http://localhost:8000/api/admin/resource

# Should return 200
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/admin/resource
```

### Check Logs:
```bash
# View audit logs
tail -f storage/logs/laravel.log | grep "Admin Action"

# View all logs
tail -f storage/logs/laravel.log
```

---

## 🆘 Emergency Procedures

### Revoke All Tokens:
```bash
php artisan db:seed --class=RevokeAllTokensSeeder
```

### Clear All Caches:
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Check for Suspicious Activity:
```bash
# Failed login attempts
grep "Email atau password salah" storage/logs/laravel.log

# Admin deletions
grep "deleted" storage/logs/laravel.log | grep "Admin Action"
```

---

## 📚 More Information

- **Full Security Guide:** See `SECURITY.md`
- **Improvements Summary:** See `SECURITY_IMPROVEMENTS_SUMMARY.md`
- **Laravel Security Docs:** https://laravel.com/docs/security
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/

---

## 🎯 Security Checklist for Pull Requests

Before submitting code:

- [ ] All user input validated
- [ ] HTML content sanitized
- [ ] File uploads validated (type, size)
- [ ] Authentication checked on protected routes
- [ ] Rate limiting applied to public endpoints
- [ ] Admin actions logged
- [ ] No sensitive data in responses
- [ ] No raw SQL queries with user input
- [ ] Error messages don't leak information
- [ ] Tests include security scenarios

---

**Keep this card handy while developing!**
