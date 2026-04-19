# Security Scan Report

## Critical Issues
- [server.js, line 28] **Exposed API Key Risk**: Although the Resend API key is accessed via `process.env.RESEND_API_KEY`, there is no validation that the environment variable is set. If missing, the error could expose internal stack traces.
- [server.js, line 45] **XSS (Cross-Site Scripting)**: User input (`name`, `email`, `message`) is directly interpolated into HTML email body without sanitization. This could allow attackers to inject malicious scripts into the email received by the site owner.
- [index.html] **Insecure Dependencies**: Tailwind CSS and Satoshi font are loaded via public CDNs without Subresource Integrity (SRI) checks, which could allow supply chain attacks if the CDN is compromised.

## Warnings
- [server.js] **Missing Rate Limiting**: The `/api/contact` endpoint has no rate limiting, making it vulnerable to spam or denial-of-service attacks.
- [server.js] **Verbose Error Responses**: Internal server errors return raw error stacks via `console.error(err.stack)` and generic messages, potentially leaking implementation details.
- [server.js] **CORS Misconfiguration**: Uses `app.use(cors())` without configuration, which allows all origins in production if deployed carelessly.
- [server.js] **Missing Security Headers**: No Content Security Policy (CSP), X-Frame-Options, or X-Content-Type-Options headers are set.

## Passed Checks
- No SQL injection vulnerabilities found (no database queries).
- No path traversal issues (no file system access with user input).
- No hardcoded secrets in frontend code.
- Authentication not applicable (static site, no auth).
- All routes are explicitly defined or handled with 404.
- Form validation present on backend (basic field checks).

---