const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit'); // SECURITY DEPENDENCY ADDITION
const helmet = require('helmet'); // SECURITY DEPENDENCY ADDITION

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Resend
if (!process.env.RESEND_API_KEY) {
  console.error('FATAL: RESEND_API_KEY is not set in environment variables');
  process.exit(1);
}
const resend = new Resend(process.env.RESEND_API_KEY);

// SECURITY MIDDLEWARE
app.use(helmet()); // SECURITY FIX: Adds secure headers (CSP, X-Frame-Options, etc.)
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? false // Will be set properly in Vercel via VERCEL_URL or custom domain
      : true, // Allow all in development
  })
); // SECURITY FIX: Prevents loose CORS in production

// Rate limiting for contact form
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: { error: 'Too many messages from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/contact', limiter); // SECURITY FIX: Prevents form spam

app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Enhanced validation
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  if (!message || !message.trim() || message.length > 2000) {
    return res.status(400).json({ error: 'Message is required and must be under 2000 characters' });
  }

  // Sanitize inputs to prevent XSS in email HTML
  const sanitize = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }; // SECURITY FIX: Prevent XSS in email output

  const safeName = sanitize(name.trim().slice(0, 100));
  const safeEmail = sanitize(email.trim());
  const safeMessage = sanitize(message.trim().slice(0, 2000));

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['hello@yoursite.com'], // Replace with your email
      subject: `New message from ${safeName}`,
      reply_to: safeEmail,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <ul>
          <li><strong>Name:</strong> ${safeName}</li>
          <li><strong>Email:</strong> ${safeEmail}</li>
        </ul>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email:', error.message); // SECURITY FIX: Avoid stack trace leakage
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message); // SECURITY FIX: Log only message, not stack
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

// INSTRUCTIONS FOR DEPLOYMENT:
// Add to package.json: "dependencies": { "express-rate-limit": "^6.8.1", "helmet": "^7.0.0" }
// Set RESEND_API_KEY in Vercel environment variables

---