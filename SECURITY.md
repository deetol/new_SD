# Security Configuration Guide

This document outlines security measures implemented in this project and provides a checklist for production deployment.

## ✅ Implemented Security Features

### Authentication & Authorization
- ✅ Laravel Sanctum with Bearer token authentication
- ✅ HttpOnly cookies for token storage (XSS protection)
- ✅ Token expiration (24 hours default, configurable)
- ✅ Middleware token validation on protected routes
- ✅ Bcrypt password hashing (12 rounds)

### Rate Limiting
- ✅ Login endpoint: 5 attempts per minute
- ✅ PPDB registration: 10 requests per minute
- ✅ Status check: 30 requests per minute

### Input Validation & Sanitization
- ✅ Form Request validation classes
- ✅ HTML sanitization on user-generated content
- ✅ File type and size validation
- ✅ Secure filename generation (prevents path traversal)

### Security Headers
- ✅ X-Frame-Options: DENY (clickjacking protection)
- ✅ X-Content-Type-Options: nosniff (MIME sniffing protection)
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Content-Security-Policy (CSP)
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy (geolocation, microphone, camera disabled)
- ✅ Strict-Transport-Security (HSTS) - enabled in production with HTTPS

### Audit Logging
- ✅ Admin actions logged (create, update, delete, status changes)
- ✅ Logs include: user ID, IP address, timestamp, resource details
- ✅ Stored in `storage/logs/laravel.log`

### CORS Configuration
- ✅ Environment-based allowed origins
- ✅ Proper credentials handling

---

## 🔒 Production Deployment Checklist

### 1. Environment Configuration

#### Backend (.env)
```bash
# CRITICAL: Change these before deployment
APP_ENV=production
APP_DEBUG=false
APP_KEY=<generate-new-key-with-php-artisan-key:generate>

# Database - Use strong credentials
DB_CONNECTION=mysql
DB_HOST=<your-db-host>
DB_PORT=3306
DB_DATABASE=<your-db-name>
DB_USERNAME=<your-db-user>
DB_PASSWORD=<strong-random-password>

# CORS - Set your production domain
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Frontend URL
FRONTEND_URL=https://yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com

# Token expiration (in minutes)
SANCTUM_TOKEN_EXPIRATION=1440

# Mail configuration (for PPDB confirmations)
MAIL_MAILER=smtp
MAIL_HOST=<your-smtp-host>
MAIL_PORT=587
MAIL_USERNAME=<your-smtp-username>
MAIL_PASSWORD=<your-smtp-password>
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"

# Queue (required for email sending)
QUEUE_CONNECTION=database
```

#### Frontend (.env.local → .env.production)
```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.com
LARAVEL_API_URL=https://api.yourdomain.com/api
```

### 2. SSL/TLS Configuration
- [ ] Obtain SSL certificate (Let's Encrypt recommended)
- [ ] Configure web server (Nginx/Apache) to use HTTPS
- [ ] Redirect all HTTP traffic to HTTPS
- [ ] Enable HSTS header (already configured in SecurityHeaders middleware)

### 3. Database Security
- [ ] Use strong database password (minimum 16 characters, mixed case, numbers, symbols)
- [ ] Restrict database access to application server IP only
- [ ] Enable database SSL/TLS connection
- [ ] Regular database backups (automated)
- [ ] Keep database software updated

### 4. Server Configuration
- [ ] Disable directory listing
- [ ] Set proper file permissions:
  ```bash
  chmod -R 755 storage bootstrap/cache
  chown -R www-data:www-data storage bootstrap/cache
  ```
- [ ] Configure firewall (allow only 80, 443, SSH)
- [ ] Disable unnecessary services
- [ ] Keep server OS and packages updated

### 5. Application Security
- [ ] Change default admin credentials immediately after deployment
- [ ] Run `php artisan config:cache` to cache configuration
- [ ] Run `php artisan route:cache` to cache routes
- [ ] Run `php artisan view:cache` to cache views
- [ ] Set up queue worker as systemd service:
  ```bash
  php artisan queue:work --daemon
  ```

### 6. File Upload Security
- [ ] Verify storage directory is NOT publicly accessible via web
- [ ] Set maximum upload size in php.ini:
  ```ini
  upload_max_filesize = 10M
  post_max_size = 10M
  ```
- [ ] Configure web server to prevent execution of uploaded files

### 7. Monitoring & Logging
- [ ] Set up log rotation for `storage/logs/laravel.log`
- [ ] Monitor failed login attempts
- [ ] Set up alerts for suspicious activity
- [ ] Regular security audit of logs

### 8. Backup Strategy
- [ ] Automated daily database backups
- [ ] Backup uploaded files (storage/app/public)
- [ ] Store backups in separate location
- [ ] Test backup restoration regularly

### 9. Additional Recommendations
- [ ] Implement 2FA for admin accounts (future enhancement)
- [ ] Set up Web Application Firewall (WAF)
- [ ] Use CDN for static assets
- [ ] Implement Content Security Policy reporting
- [ ] Regular security updates and patches
- [ ] Penetration testing before launch

---

## 🚨 Security Incident Response

If you suspect a security breach:

1. **Immediately revoke all admin tokens:**
   ```bash
   php artisan db:seed --class=RevokeAllTokensSeeder
   ```

2. **Check audit logs:**
   ```bash
   tail -f storage/logs/laravel.log | grep "Admin Action"
   ```

3. **Review recent database changes**

4. **Change all passwords and regenerate APP_KEY**

5. **Investigate and patch vulnerability**

---

## 📝 Security Best Practices for Developers

### When Adding New Features:
1. Always validate and sanitize user input
2. Use Form Request classes for complex validation
3. Apply rate limiting to public endpoints
4. Log admin actions using `LogsAdminActions` trait
5. Use parameterized queries (Eloquent ORM)
6. Never expose sensitive data in API responses
7. Test with security in mind

### Code Review Checklist:
- [ ] Input validation present?
- [ ] Output sanitized (XSS prevention)?
- [ ] Authentication/authorization checked?
- [ ] Rate limiting applied?
- [ ] Sensitive data protected?
- [ ] Audit logging added?
- [ ] Error messages don't leak information?

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Laravel Security Best Practices](https://laravel.com/docs/security)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)

---

## 🔄 Regular Maintenance

### Weekly:
- Review audit logs for suspicious activity
- Check for failed login attempts

### Monthly:
- Update dependencies (`composer update`, `npm update`)
- Review and rotate API tokens if needed
- Test backup restoration

### Quarterly:
- Security audit
- Review and update security policies
- Penetration testing (if budget allows)

---

**Last Updated:** 2026-05-31

**Security Contact:** admin@sekolah.id
