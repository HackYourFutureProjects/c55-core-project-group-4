// tests/health.test.js
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server/app.js';

describe('GET /api/health', () => {
  it('returns status 200', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
  });
});
