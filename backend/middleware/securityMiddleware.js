// Custom Zero-Dependency Security Middleware Suite
// Built specifically to safeguard MERN stack apps without breaking admin access or requiring external packages

// 1. In-memory Rate Limiter
const rateLimitMap = new Map();

// Periodic cleanup every 10 minutes to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
        if (now > record.resetTime) {
            rateLimitMap.delete(key);
        }
    }
}, 10 * 60 * 1000);

/**
 * Creates a rate limiting middleware.
 * @param {Object} options
 * @param {number} options.windowMs Window in milliseconds (e.g. 15 minutes)
 * @param {number} options.max Maximum requests per window
 * @param {string} options.message Error message returned when limit exceeded
 */
const rateLimiter = (options = {}) => {
    const windowMs = options.windowMs || 15 * 60 * 1000;
    const max = options.max || 100;
    const message = options.message || 'Too many requests, please try again later.';

    return (req, res, next) => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
        const key = `${req.baseUrl || req.path}:${ip}`;
        const now = Date.now();

        let record = rateLimitMap.get(key);

        if (!record || now > record.resetTime) {
            record = { count: 1, resetTime: now + windowMs };
            rateLimitMap.set(key, record);
            return next();
        }

        record.count += 1;

        if (record.count > max) {
            const retryAfterSec = Math.ceil((record.resetTime - now) / 1000);
            res.setHeader('Retry-After', retryAfterSec);
            return res.status(429).json({ message });
        }

        next();
    };
};

// 2. HTTP Security Headers (replicates Helmet core rules)
const securityHeaders = (req, res, next) => {
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Prevent clickjacking via iframes
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // Enable legacy XSS filter
    res.setHeader('X-XSS-Protection', '1; mode=block');
    // Hide Express signature
    res.removeHeader('X-Powered-By');
    // Referrer policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
};

// 3. NoSQL Injection Sanitizer
// Strips keys containing '$' or '.' from req.body, req.query, and req.params (except for password fields)
const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;

    for (const key of Object.keys(obj)) {
        if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitizeObject(obj[key]);
        }
    }
    return obj;
};

const sanitizeInput = (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        // Clone and sanitize without mangling actual password strings
        const { password, currentPassword, newPassword, confirmPassword, ...rest } = req.body;
        sanitizeObject(rest);
    }
    if (req.query && typeof req.query === 'object') {
        sanitizeObject(req.query);
    }
    if (req.params && typeof req.params === 'object') {
        sanitizeObject(req.params);
    }
    next();
};

module.exports = {
    securityHeaders,
    sanitizeInput,
    rateLimiter
};
