# Portfolio Pro Test Suite

## How to Run

1. Install dependencies:
```bash
npm install vitest jsdom @testing-library/react @testing-library/dom msw
```

2. Run tests:
```bash
npm test
# or
npx vitest
```

## Test Coverage

### `app.test.js`
- Verifies all main sections (Hero, About, Projects, Contact) render correctly
- Tests component structure and DOM hierarchy
- Validates UI elements like buttons, forms, and navigation
- Checks accessibility attributes and ARIA roles
- Ensures proper styling classes are applied

### `api.test.js`
- Tests contact form API integration with mock server
- Validates request payload structure and headers
- Tests error handling for server failures
- Verifies form validation logic
- Checks security aspects (no API key leakage)
- Tests rate limiting protection

## Notes
- Uses MSW (Mock Service Worker) for API mocking
- Tests both happy path and error scenarios
- Includes accessibility and security checks
- Simulates real user interactions
- All tests are isolated with proper mocking