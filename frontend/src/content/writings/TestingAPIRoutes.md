---
title: "Testing the Parts Nobody Sees: API Route Testing"
date: "2026-09-10"
excerpt: "The frontend gets all the attention, but the API is where bugs hide. Testing routes is not glamorous, but it is where production reliability comes from."
---

## Why API testing matters

The frontend can look perfect, but if the API returns wrong data or crashes under load, the entire portfolio falls apart. Yet many developers skip testing the backend because it is not visible.

That is backwards. The API is the most important part to test, because it is the part that users depend on and that is hardest to debug in production.

## Setting up testing infrastructure

For an Express backend, the standard tool is Jest + Supertest:

```bash
npm install --save-dev jest supertest
```

Then configure Jest in your package.json:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "jest": {
    "testEnvironment": "node",
    "testMatch": ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"]
  }
}
```

## Testing a basic route

Start simple. Test that a route returns the expected data:

```js
// __tests__/projects.test.js
const request = require('supertest');
const app = require('../src/server');

describe('GET /api/projects', () => {
  it('should return a list of projects', async () => {
    const response = await request(app)
      .get('/api/projects')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    
    // Validate the structure of each project
    response.body.forEach(project => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('name');
      expect(project).toHaveProperty('description');
    });
  });
});
```

This test makes a real HTTP request to the route and checks:
1. The response status is 200 (success)
2. The response is an array
3. Each item has the expected properties

## Testing error cases

A good API fails predictably. Test that it does:

```js
describe('GET /api/projects/:id', () => {
  it('should return a 404 for non-existent project', async () => {
    const response = await request(app)
      .get('/api/projects/nonexistent-id')
      .expect(404);

    expect(response.body).toHaveProperty('error');
  });

  it('should return a 400 for missing ID parameter', async () => {
    const response = await request(app)
      .get('/api/projects/')
      .expect(404); // Route does not exist without ID
  });

  it('should return the correct project when found', async () => {
    const response = await request(app)
      .get('/api/projects/known-id')
      .expect(200);

    expect(response.body.id).toBe('known-id');
  });
});
```

These tests ensure your error handling actually works.

## Testing validation

Your API should reject bad input:

```js
describe('POST /api/contact', () => {
  it('should reject missing email', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        message: 'Hello'
        // email is missing
      })
      .expect(400);

    expect(response.body.error).toContain('email');
  });

  it('should reject invalid email format', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'not-an-email',
        message: 'Hello'
      })
      .expect(400);

    expect(response.body.error).toContain('email');
  });

  it('should accept valid submission', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message'
      })
      .expect(200);

    expect(response.body.success).toBe(true);
  });
});
```

Validation is often the most important part to test, because it is the first line of defense against bad data.

## Mocking external dependencies

Your API might call a database, send emails, or hit third-party APIs. You do not want tests to actually do these things (slow, expensive, side effects). Use mocks:

```js
jest.mock('../src/utils/database', () => ({
  getProjects: jest.fn(() => Promise.resolve([
    { id: '1', name: 'Project A', description: 'A sample project' }
  ]))
}));

jest.mock('../src/utils/email', () => ({
  sendEmail: jest.fn(() => Promise.resolve(true))
}));

describe('POST /api/contact with mocks', () => {
  it('should send an email when contact form is submitted', async () => {
    const { sendEmail } = require('../src/utils/email');

    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      })
      .expect(200);

    // Verify sendEmail was called
    expect(sendEmail).toHaveBeenCalledWith('john@example.com', expect.any(String));
  });
});
```

Now your tests run in milliseconds without hitting the database or sending real emails.

## Testing authentication and permissions

If your API has protected routes, test that they are actually protected:

```js
describe('DELETE /api/projects/:id (protected)', () => {
  it('should reject request without authentication', async () => {
    const response = await request(app)
      .delete('/api/projects/1')
      .expect(401);

    expect(response.body.error).toContain('authenticated');
  });

  it('should reject request with invalid token', async () => {
    const response = await request(app)
      .delete('/api/projects/1')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    expect(response.body.error).toContain('invalid');
  });

  it('should allow deletion with valid token', async () => {
    const response = await request(app)
      .delete('/api/projects/1')
      .set('Authorization', 'Bearer valid-token')
      .expect(200);
  });
});
```

If your authentication does not work, your entire API is compromised. Test it.

## Running tests before deployment

Add a pre-commit hook to catch broken tests before you push:

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm test"
```

Now if tests fail, you cannot commit. This prevents broken code from reaching production.

## The coverage question

Aim for 80% test coverage, not 100%. Some code (like UI rendering) is hard to test and low-risk. Focus on:

- API routes
- Validation logic
- Error handling
- Authentication and permissions

```bash
npm test -- --coverage
```

This shows you which code paths are not tested. Use it to identify gaps, not to chase a number.

## The result

A well-tested API is:

- **Reliable**: Failures are caught before deployment
- **Debuggable**: Tests document what each route does
- **Refactorable**: You can change code safely knowing tests will catch regressions
- **Confident**: You ship knowing the backend works

Testing the backend is not optional. It is the difference between a portfolio that works and a portfolio that might fail at any moment.