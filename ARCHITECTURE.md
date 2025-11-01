# BizFlow Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BizFlow System                           │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐          ┌──────────────────────────┐
│   Frontend (React)       │          │   Backend (Express)      │
│                          │          │                          │
│  ┌────────────────────┐  │          │  ┌────────────────────┐  │
│  │  React Router      │  │          │  │  Express Routes    │  │
│  │  - /login          │  │          │  │  - /api/auth/*     │  │
│  │  - /register       │  │          │  │  - /api/workflows/*│  │
│  │  - /dashboard      │  │          │  │  - /api/tasks/*    │  │
│  │  - /workflows      │  │          │  └────────────────────┘  │
│  │  - /tasks          │  │          │                          │
│  └────────────────────┘  │          │  ┌────────────────────┐  │
│                          │          │  │  Middleware        │  │
│  ┌────────────────────┐  │          │  │  - Auth            │  │
│  │  State (Zustand)   │  │          │  │  - RBAC            │  │
│  │  - Auth State      │  │          │  │  - Rate Limit      │  │
│  │  - User Profile    │  │          │  │  - Error Handler   │  │
│  └────────────────────┘  │          │  └────────────────────┘  │
│                          │          │                          │
│  ┌────────────────────┐  │          │  ┌────────────────────┐  │
│  │  API Services      │◄─┼─────────►│  │  Controllers       │  │
│  │  - authService     │  │   HTTP   │  │  - authController  │  │
│  │  - workflowService │  │   REST   │  │  - workflowCtrl    │  │
│  │  - taskService     │  │          │  │  - taskController  │  │
│  └────────────────────┘  │          │  └────────────────────┘  │
│                          │          │                          │
│  ┌────────────────────┐  │          │  ┌────────────────────┐  │
│  │  Components        │  │          │  │  Services          │  │
│  │  - Layout          │  │          │  │  - WorkflowEngine  │  │
│  │  - LoginPage       │  │          │  │  - TaskManager     │  │
│  │  - Dashboard       │  │          │  │  - NotificationSvc │  │
│  │  - WorkflowCanvas  │  │          │  └────────────────────┘  │
│  └────────────────────┘  │          │                          │
│                          │          │  ┌────────────────────┐  │
│  Port: 5173 (Vite)       │          │  │  Prisma ORM        │  │
└──────────────────────────┘          │  └─────────┬──────────┘  │
                                      │            │             │
                                      │  Port: 3001│             │
                                      └────────────┼─────────────┘
                                                   │
                                      ┌────────────▼─────────────┐
                                      │  PostgreSQL Database     │
                                      │                          │
                                      │  Tables:                 │
                                      │  - users                 │
                                      │  - teams                 │
                                      │  - user_teams            │
                                      │  - workflow_templates    │
                                      │  - workflow_definitions  │
                                      │  - node_definitions      │
                                      │  - edge_definitions      │
                                      │  - workflow_instances    │
                                      │  - task_instances        │
                                      │                          │
                                      │  Port: 5432              │
                                      └──────────────────────────┘
```

## Authentication Flow

```
┌─────────┐                    ┌─────────┐                    ┌──────────┐
│ Browser │                    │ Backend │                    │ Database │
└────┬────┘                    └────┬────┘                    └────┬─────┘
     │                              │                              │
     │ 1. POST /api/auth/register   │                              │
     ├─────────────────────────────►│                              │
     │    { email, password, name } │                              │
     │                              │ 2. Hash password (bcrypt)    │
     │                              ├─────────┐                    │
     │                              │         │                    │
     │                              │◄────────┘                    │
     │                              │                              │
     │                              │ 3. INSERT INTO users         │
     │                              ├─────────────────────────────►│
     │                              │                              │
     │                              │ 4. User record               │
     │                              │◄─────────────────────────────┤
     │ 5. Success response          │                              │
     │◄─────────────────────────────┤                              │
     │                              │                              │
     │ 6. POST /api/auth/login      │                              │
     ├─────────────────────────────►│                              │
     │    { email, password }       │                              │
     │                              │ 7. SELECT FROM users         │
     │                              ├─────────────────────────────►│
     │                              │                              │
     │                              │ 8. User record               │
     │                              │◄─────────────────────────────┤
     │                              │                              │
     │                              │ 9. Compare passwords         │
     │                              ├─────────┐                    │
     │                              │         │                    │
     │                              │◄────────┘                    │
     │                              │                              │
     │                              │ 10. Generate JWT token       │
     │                              ├─────────┐                    │
     │                              │         │                    │
     │                              │◄────────┘                    │
     │ 11. { token, user }          │                              │
     │◄─────────────────────────────┤                              │
     │                              │                              │
     │ 12. Store token (localStorage)│                             │
     ├──────────┐                   │                              │
     │          │                   │                              │
     │◄─────────┘                   │                              │
     │                              │                              │
     │ 13. GET /api/auth/profile    │                              │
     ├─────────────────────────────►│                              │
     │    Authorization: Bearer {token}                            │
     │                              │                              │
     │                              │ 14. Verify JWT token         │
     │                              ├─────────┐                    │
     │                              │         │                    │
     │                              │◄────────┘                    │
     │                              │                              │
     │                              │ 15. SELECT FROM users        │
     │                              ├─────────────────────────────►│
     │                              │                              │
     │                              │ 16. User record              │
     │                              │◄─────────────────────────────┤
     │ 17. User profile             │                              │
     │◄─────────────────────────────┤                              │
     │                              │                              │
```

## Data Models

### User Model
```typescript
User {
  id: string (UUID)
  email: string (unique)
  passwordHash: string
  name: string
  role: 'ADMIN' | 'MANAGER' | 'MEMBER'
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relations
  teams: UserTeam[]
  workflowsCreated: WorkflowDefinition[]
  workflowInstancesStarted: WorkflowInstance[]
  tasksAssigned: TaskInstance[]
}
```

### Workflow Definition Model
```typescript
WorkflowDefinition {
  id: string (UUID)
  name: string
  description: string?
  version: number
  createdById: string
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relations
  createdBy: User
  nodes: NodeDefinition[]
  edges: EdgeDefinition[]
  instances: WorkflowInstance[]
}
```

### Node Definition Model
```typescript
NodeDefinition {
  id: string (UUID)
  workflowId: string
  type: 'START' | 'TASK' | 'APPROVAL' | 'CONDITION' | 'END'
  positionX: number
  positionY: number
  data: JSON {
    // Node-specific configuration
    taskName?: string
    assigneeId?: string
    formFields?: FormField[]
    conditionLogic?: string
    approvers?: string[]
    dueDate?: string
  }
  
  // Relations
  workflow: WorkflowDefinition
  outgoingEdges: EdgeDefinition[]
  incomingEdges: EdgeDefinition[]
  taskInstances: TaskInstance[]
}
```

### Task Instance Model
```typescript
TaskInstance {
  id: string (UUID)
  workflowInstanceId: string
  nodeDefinitionId: string
  assigneeId: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED'
  dueDate: DateTime?
  completedAt: DateTime?
  outputData: JSON?
  createdAt: DateTime
  updatedAt: DateTime
  
  // Relations
  workflowInstance: WorkflowInstance
  nodeDefinition: NodeDefinition
  assignee: User
}
```

## Security Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Security Layers                       │
└──────────────────────────────────────────────────────────┘

Layer 1: Network Security
├─ CORS Protection (configured origins)
├─ Rate Limiting
│  ├─ Auth endpoints: 5 requests / 15 minutes
│  └─ API endpoints: 100 requests / 15 minutes
└─ HTTPS (recommended for production)

Layer 2: Authentication
├─ JWT Tokens (7-day expiration)
├─ Password Hashing (bcrypt, 10 rounds)
└─ Token Validation Middleware

Layer 3: Authorization (RBAC)
├─ Role: ADMIN
│  ├─ Full system access
│  ├─ User management
│  └─ System configuration
│
├─ Role: MANAGER
│  ├─ Create workflows
│  ├─ Assign tasks
│  └─ View team analytics
│
└─ Role: MEMBER
   ├─ View assigned tasks
   ├─ Complete tasks
   └─ View own workflows

Layer 4: Data Security
├─ SQL Injection Protection (Prisma ORM)
├─ XSS Protection (React auto-escaping)
├─ Environment Variables (.env files)
└─ Type Safety (TypeScript)
```

## Request Lifecycle

```
1. Browser Request
   │
   ├─► 2. CORS Check
   │      │
   │      ├─► FAIL → 403 Forbidden
   │      └─► PASS
   │
   ├─► 3. Rate Limiter
   │      │
   │      ├─► LIMIT EXCEEDED → 429 Too Many Requests
   │      └─► PASS
   │
   ├─► 4. Request Logger (Winston)
   │
   ├─► 5. Body Parser (JSON)
   │
   ├─► 6. Route Handler
   │      │
   │      ├─► /api/auth/* → Auth Controller
   │      ├─► /api/workflows/* → Workflow Controller
   │      └─► /api/tasks/* → Task Controller
   │
   ├─► 7. Authentication Middleware
   │      │
   │      ├─► NO TOKEN → 401 Unauthorized
   │      ├─► INVALID TOKEN → 401 Unauthorized
   │      └─► VALID TOKEN → Extract User
   │
   ├─► 8. Authorization Middleware
   │      │
   │      ├─► INSUFFICIENT ROLE → 403 Forbidden
   │      └─► AUTHORIZED → Continue
   │
   ├─► 9. Controller Logic
   │      │
   │      └─► Database Query (Prisma)
   │             │
   │             └─► PostgreSQL
   │
   ├─► 10. Response
   │       │
   │       ├─► Success (200, 201)
   │       └─► Error (400, 401, 403, 404, 500)
   │
   └─► 11. Error Handler Middleware
          │
          └─► Log Error & Send Response
```

## Technology Stack Details

### Backend Stack
```
┌─────────────────────────────────┐
│ Node.js v18+                    │
├─────────────────────────────────┤
│ Express.js v5.1.0               │
│ - Routing                       │
│ - Middleware                    │
│ - HTTP handling                 │
├─────────────────────────────────┤
│ TypeScript v5.9.3               │
│ - Type safety                   │
│ - Better IDE support            │
│ - Compile-time error checking   │
├─────────────────────────────────┤
│ Prisma ORM v6.18.0              │
│ - Type-safe database queries    │
│ - Schema migrations             │
│ - Database abstraction          │
├─────────────────────────────────┤
│ PostgreSQL v14+                 │
│ - Relational database           │
│ - ACID compliance               │
│ - JSON support                  │
├─────────────────────────────────┤
│ Security                        │
│ - bcrypt v6.0.0 (hashing)       │
│ - jsonwebtoken v9.0.2 (JWT)     │
│ - express-rate-limit (DDoS)     │
│ - cors v2.8.5 (CORS)            │
├─────────────────────────────────┤
│ Utilities                       │
│ - winston v3.18.3 (logging)     │
│ - dotenv v17.2.3 (env vars)     │
│ - ts-node v10.9.2 (dev server)  │
│ - nodemon v3.1.10 (auto-reload) │
└─────────────────────────────────┘
```

### Frontend Stack
```
┌─────────────────────────────────┐
│ React v18.3.1                   │
├─────────────────────────────────┤
│ Vite v7.1.12                    │
│ - Fast HMR                      │
│ - Optimized builds              │
│ - ES modules                    │
├─────────────────────────────────┤
│ TypeScript v5.6.2               │
│ - Type safety                   │
│ - Better refactoring            │
│ - IntelliSense                  │
├─────────────────────────────────┤
│ Routing & State                 │
│ - react-router-dom (routing)    │
│ - zustand (state management)    │
├─────────────────────────────────┤
│ Forms & Validation              │
│ - react-hook-form (forms)       │
├─────────────────────────────────┤
│ Styling                         │
│ - Tailwind CSS (utility-first)  │
│ - @tailwindcss/postcss          │
├─────────────────────────────────┤
│ HTTP Client                     │
│ - axios (API calls)             │
│ - Request/response interceptors │
└─────────────────────────────────┘
```

## Development Workflow

```
Developer → Write Code
            │
            ├─► Backend (TypeScript)
            │   │
            │   ├─► npm run dev (nodemon + ts-node)
            │   │   └─► Auto-reload on changes
            │   │
            │   ├─► npm run build (tsc)
            │   │   └─► Compile to JavaScript
            │   │
            │   └─► npm run prisma:migrate
            │       └─► Update database schema
            │
            └─► Frontend (React + TypeScript)
                │
                ├─► npm run dev (Vite)
                │   ├─► Fast HMR
                │   └─► Instant feedback
                │
                └─► npm run build (Vite + tsc)
                    ├─► Type checking
                    ├─► Bundle optimization
                    └─► Production assets

Testing Flow:
  │
  ├─► Code Review (manual/automated)
  ├─► Security Scan (CodeQL)
  ├─► Build Verification
  └─► Manual Testing

Deployment:
  │
  ├─► Build Backend (npm run build)
  ├─► Build Frontend (npm run build)
  ├─► Run Migrations (prisma migrate deploy)
  └─► Start Server (npm start)
```

## Next Phase Preview (Phase 2)

Phase 2 will add the workflow engine with these components:

```
Workflow Canvas (React Flow)
├─ Node Library
│  ├─ Start Node
│  ├─ Task Node
│  ├─ Approval Node
│  ├─ Condition Node
│  └─ End Node
│
├─ Canvas Area
│  ├─ Drag & Drop
│  ├─ Node Connections
│  └─ Auto-layout
│
└─ Properties Panel
   ├─ Node Configuration
   ├─ Assignee Selection
   └─ Form Builder

Workflow Engine (Backend)
├─ Workflow Execution
├─ Task Assignment
├─ Conditional Logic
└─ Instance Management
```
