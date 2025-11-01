# BizFlow - Workflow Management System

A comprehensive workflow automation platform built with modern technologies.

## Features

- **Visual Workflow Builder**: Drag-and-drop interface using React Flow
- **Role-Based Access Control (RBAC)**: Admin, Manager, and Member roles
- **Task Management**: Assign, track, and complete tasks
- **Workflow Execution Engine**: Automated workflow progression
- **Analytics Dashboard**: KPIs and performance metrics
- **Real-time Notifications**: In-app and email notifications
- **Dynamic Form Builder**: Create custom forms for task nodes

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with Prisma ORM
- JWT Authentication
- Winston for logging
- bcrypt for password hashing

### Frontend
- React with TypeScript
- Material-UI for components
- React Flow for workflow canvas
- Zustand for state management
- React Router for navigation
- React Hook Form for forms
- Axios for API calls
- Recharts for analytics

## Project Structure

```
Portfolio/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, logger config
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, error handling
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── index.ts         # Main entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   └── App.tsx          # Main app component
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```
DATABASE_URL="postgresql://user:password@localhost:5432/bizflow"
JWT_SECRET="your-secret-key"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Generate Prisma Client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Start the development server:
```bash
npm run dev
```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Workflows
- `POST /api/workflows` - Create a new workflow
- `GET /api/workflows` - List all workflows
- `GET /api/workflows/:id` - Get workflow by ID
- `POST /api/workflows/:id/start` - Start a workflow instance

### Tasks
- `GET /api/tasks/me` - Get current user's tasks
- `PATCH /api/tasks/:id` - Update task status
- `POST /api/tasks/:id/complete` - Complete a task

### Notifications
- `GET /api/notifications` - Get current user's notifications
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `POST /api/notifications/read-all` - Mark all notifications as read

## Development Phases

### Phase 1: Foundation & Core Infrastructure ✅
- [x] Project initialization
- [x] Database schema design
- [x] Authentication & authorization
- [x] Basic frontend layout

### Phase 2: Workflow Engine & Core Features ✅
- [x] Workflow canvas implementation
- [x] Workflow CRUD API
- [x] Workflow execution engine

### Phase 3: Task Management & User Interaction ✅
- [x] Task inbox and management UI
- [x] Task API endpoints
- [x] Notification system (in-app)

### Phase 4: Analytics & Polish ✅
- [x] Analytics dashboard
- [ ] Form builder (planned for future enhancement)
- [x] Performance optimization
- [x] Code quality and type safety

## Database Schema

Key entities:
- **User**: User accounts with roles
- **Team**: Organizations/teams
- **WorkflowDefinition**: Workflow templates
- **NodeDefinition**: Individual workflow nodes
- **EdgeDefinition**: Connections between nodes
- **WorkflowInstance**: Running workflow instances
- **TaskInstance**: Individual tasks
- **Notification**: User notifications

## License

MIT

## Contributing

This is a learning project. Contributions welcome!
