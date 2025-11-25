# Angular-Nest Monorepo

This is a monorepo project built with Nx that contains an Angular frontend and a Nest.js backend with a shared library for common code.

## Project Structure

```
angular-nest-monorepo/
├── frontend/               # Angular application
├── backend/                # Nest.js application
├── shared/
│   └── models/            # Shared library for common models/interfaces
├── frontend-e2e/          # E2E tests for frontend
├── backend-e2e/           # E2E tests for backend
└── nx.json                # Nx workspace configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

## Running the Applications

### Start Backend (Nest.js)

```bash
npx nx serve backend
```

The backend will run on `http://localhost:3000/api`

### Start Frontend (Angular)

```bash
npx nx serve frontend
```

The frontend will run on `http://localhost:4200`

### Run Both Applications Concurrently

```bash
npx nx run-many -t serve -p backend frontend
```

## Building the Applications

### Build Backend

```bash
npx nx build backend
```

### Build Frontend

```bash
npx nx build frontend
```

### Build All

```bash
npx nx run-many -t build -p backend frontend
```

## Testing

### Run Backend Tests

```bash
npx nx test backend
```

### Run Frontend Tests

```bash
npx nx test frontend
```

### Run All Tests

```bash
npx nx run-many -t test
```

## Project Features

- **Hello World Integration**: The frontend fetches and displays "Hello World!" message from the backend
- **CORS Enabled**: Backend is configured with CORS to allow frontend communication
- **Shared Libraries**: Common code can be shared between frontend and backend via the `shared/models` library
- **Monorepo Benefits**: 
  - Unified dependency management
  - Code sharing between apps
  - Consistent tooling and configuration
  - Efficient builds with Nx caching

## Nx Commands

### Generate New Library

```bash
npx nx g @nx/js:lib <library-name>
```

### Generate New Angular Component

```bash
npx nx g @nx/angular:component <component-name> --project=frontend
```

### Generate New Nest.js Service

```bash
npx nx g @nx/nest:service <service-name> --project=backend
```

### View Project Graph

```bash
npx nx graph
```

## API Endpoints

### Backend

- `GET http://localhost:3000/api` - Returns "Hello World!"

## Learn More

- [Nx Documentation](https://nx.dev)
- [Angular Documentation](https://angular.dev)
- [Nest.js Documentation](https://nestjs.com)
