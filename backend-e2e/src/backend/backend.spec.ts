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
    // Performance threshold: 1000ms is chosen as a reasonable limit for API health checks
    // in development/test environments. Adjust via PERFORMANCE_THRESHOLD_MS env var if needed.
    const performanceThreshold = parseInt(process.env.PERFORMANCE_THRESHOLD_MS || '1000', 10);
    
    const start = Date.now();
    await axios.get(`/api`);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(performanceThreshold);
  });

  it('should handle CORS correctly', async () => {
    const res = await axios.get(`/api`, {
      headers: {
        'Origin': 'http://localhost:4200'
      }
    });

    expect(res.status).toBe(200);
    expect(res.data).toBe('Hello World!');
    
    // Verify CORS headers are present
    expect(res.headers['access-control-allow-origin']).toBeDefined();
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:4200');
  });
});
