import axios from 'axios';

describe('GET /api', () => {
  it('should return Hello World message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toBe('Hello World!');
  });

  it('should have correct content-type for text response', async () => {
    const res = await axios.get(`/api`);

    // NestJS returns text/html for string responses
    expect(res.headers['content-type']).toMatch(/text\/html/);
  });

  it('should respond within acceptable time', async () => {
    const start = Date.now();
    await axios.get(`/api`);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000); // Should respond within 1 second
  });

  it('should handle CORS correctly', async () => {
    const res = await axios.get(`/api`, {
      headers: {
        'Origin': 'http://localhost:4200'
      }
    });

    expect(res.status).toBe(200);
    expect(res.data).toBe('Hello World!');
  });

  it('should return string response', async () => {
    const res = await axios.get(`/api`);

    expect(typeof res.data).toBe('string');
    expect(res.data).toContain('Hello');
    expect(res.data).toContain('World');
  });
});
