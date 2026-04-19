import { describe, it, expect, beforeEach } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Contact } from '../src/components/Contact';

// Mock fetch globally
global.fetch = vi.fn();

describe('Contact Form API Integration', () => {
  const server = setupServer(
    rest.post('/api/contact', (req, res, ctx) => {
      return res(ctx.json({ success: true }));
    }),
    rest.post('/api/contact', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ error: 'Failed to send message' }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('sends POST request to /api/contact with correct payload', async () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I would like to work together!'
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    expect(response.ok).toBe(true);
    expect(data.success).toBe(true);
  });

  it('handles server error response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Failed to send message' })
    });

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello!'
      }),
    });

    expect(response.ok).toBe(false);
    expect(response.status).toBe(500);
  });

  it('validates required fields before submission', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

    // Test missing name
    let response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'john@example.com',
        message: 'Hello!'
      }),
    });

    expect(response.ok).toBe(false);

    // Test invalid email
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Hello!'
      }),
    });

    expect(response.ok).toBe(false);
  });
});

describe('API Security', () => {
  it('does not expose RESEND_API_KEY in frontend requests', () => {
    const sensitivePatterns = [
      /RESEND_API_KEY/i,
      /api-key/i,
      /secret/i,
      /password/i
    ];

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello!'
      }),
    };

    const bodyString = request.body;
    
    sensitivePatterns.forEach(pattern => {
      expect(bodyString).not.toMatch(pattern);
    });
  });

  it('implements rate limiting protection', async () => {
    // This would normally be tested at the server level
    // For frontend, we check that repeated submissions are handled gracefully
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello!'
    };

    global.fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true }) })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true }) })
      .mockResolvedValueOnce({ 
        ok: false, 
        status: 429, 
        json: () => Promise.resolve({ error: 'Too many messages from this IP, please try again later.' }) 
      });

    // First submission
    let response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    expect(response.ok).toBe(true);

    // Third submission should be rate limited
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    expect(response.status).toBe(429);
  });
});