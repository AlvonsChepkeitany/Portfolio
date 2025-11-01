# BizFlow - Workflow Management System

A comprehensive workflow automation and business process management system built with modern web technologies.

## Overview

BizFlow is a powerful workflow management platform that enables teams to design, execute, and monitor business processes. It features a visual workflow builder, task management, role-based access control, and real-time analytics.

## Tech Stack

### Backend
- **Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt
- **Logging**: Winston
- **API**: RESTful API

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Features Implemented

### Phase 1: Foundation & Core Infrastructure ✅

#### 1.1 Project Initialization & Tech Stack ✅
- ✅ Monorepo structure with separate backend and frontend
- ✅ Express.js server with TypeScript
- ✅ Environment variables configuration
- ✅ Winston logging and error handling middleware
- ✅ React application with Vite
- ✅ Zustand for state management
- ✅ React Router for navigation
- ✅ Tailwind CSS for styling

#### 1.2 Database Schema Design ✅
- ✅ PostgreSQL database setup
- ✅ Prisma ORM integration
- ✅ Core models: User, Team, UserTeam, WorkflowTemplate
- ✅ Workflow engine models: WorkflowDefinition, NodeDefinition, EdgeDefinition, WorkflowInstance, TaskInstance
- ✅ Comprehensive enums for Role, NodeType, WorkflowStatus, TaskStatus

#### 1.3 Authentication & Authorization (RBAC) ✅
- ✅ User registration endpoint with password hashing (bcrypt)
- ✅ Login endpoint with JWT generation
- ✅ Authentication middleware for protected routes
- ✅ Authorization middleware for role-based access control
- ✅ Profile endpoint to get current user info

#### 1.4 Basic Frontend Layout & Auth Pages ✅
- ✅ Login page with form validation
- ✅ Registration page with form validation
- ✅ Protected route wrapper
- ✅ Main layout with header and navigation
- ✅ Auth state management with Zustand
- ✅ Dashboard page

## Project Structure

```
Portfolio/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files (logger, etc.)
│   │   ├── middleware/     # Express middleware (auth, error handling)
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # Zustand stores
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── .env                # Environment variables
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

4. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file
echo "VITE_API_URL=http://localhost:3001/api" > .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile (protected)

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/bizflow
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## Database Schema

The application uses the following main models:

- **User**: User accounts with role-based access (ADMIN, MANAGER, MEMBER)
- **Team**: Organizations/teams with subscription plans
- **UserTeam**: Many-to-many relationship between users and teams
- **WorkflowTemplate**: Reusable workflow templates
- **WorkflowDefinition**: Complete workflow definitions with nodes and edges
- **NodeDefinition**: Individual workflow nodes (START, TASK, APPROVAL, CONDITION, END)
- **EdgeDefinition**: Connections between nodes
- **WorkflowInstance**: Running instances of workflows
- **TaskInstance**: Individual tasks assigned to users

## Development Roadmap

### Phase 2: Workflow Engine & Core Features (Next)
- [ ] Workflow Canvas with React Flow
- [ ] Drag-and-drop visual builder
- [ ] Node library and properties panel
- [ ] Workflow CRUD API
- [ ] Workflow execution engine

### Phase 3: Task Management & User Interaction
- [ ] Task inbox and management UI
- [ ] Task API endpoints
- [ ] Notification system with WebSockets
- [ ] Email notifications with background jobs

### Phase 4: Analytics & Polish
- [ ] Analytics dashboard
- [ ] Form builder for dynamic task forms
- [ ] Performance optimization
- [ ] Comprehensive testing

## License

MIT

## Contributors

Built with ❤️ by the BizFlow team
