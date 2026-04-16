import { describe, expect, test } from 'vitest';
import request from 'supertest';
import app from '../server/app.js';


describe('GET /api/cohort', () => {
  test('GET /api/cohort returns all dishes', async () => {
    const response = await request(app).get('/api/cohort');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/cohort/:id', () => {
  test('GET /api/cohort/:id returns a dish', async () => {
    const response = await request(app).get('/api/cohort/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
  });

  test('GET /api/cohort/:id returns 404 for unknown id', async () => {
    const response = await request(app).get('/api/cohort/999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

describe('GET /api/cohort/area/:area', () => {
  test('GET /api/cohort/area/:area filters by area', async () => {
    const response = await request(app).get('/api/cohort/area/Ukrainian');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/cohort/added_by/:added_by', () => {
  test('GET /api/cohort/added_by/:added_by filters by author', async () => {
    const response = await request(app).get('/api/cohort/added_by/Diana');
    expect(response.status).toBe(200);
  });
});
