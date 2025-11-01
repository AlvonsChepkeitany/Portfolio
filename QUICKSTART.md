# BizFlow Quick Start Guide

Get BizFlow up and running in 5 minutes!

## Prerequisites

✅ Node.js 18+ installed  
✅ PostgreSQL installed and running  
✅ Git installed  

## Quick Setup

### 1. Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/AlvonsChepkeitany/Portfolio.git
cd Portfolio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Database (1 minute)

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE bizflow;"

# Configure backend environment
cd ../backend
cp .env.example .env

# Edit .env and set your DATABASE_URL:
# DATABASE_URL="postgresql://postgres:your_password@localhost:5432/bizflow?schema=public"
```

### 3. Initialize Database (1 minute)

```bash
# From backend directory
npm run prisma:generate
npm run prisma:migrate
```

### 4. Configure Frontend (30 seconds)

```bash
# From frontend directory
cd ../frontend
echo "VITE_API_URL=http://localhost:3001/api" > .env
```

### 5. Start Both Servers (30 seconds)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server starts on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App starts on http://localhost:5173
```

## Verify Installation

1. Open http://localhost:5173 in your browser
2. Click "create a new account"
3. Fill in the registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click "Create account"
5. Login with your credentials
6. You should see the dashboard! 🎉

## What You Just Built

✅ Full-stack TypeScript application  
✅ Secure authentication with JWT  
✅ PostgreSQL database with Prisma ORM  
✅ React frontend with Tailwind CSS  
✅ Protected routes and RBAC  
✅ Rate limiting and security features  

## Default Ports

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Database: localhost:5432

## Troubleshooting

**Problem: Port already in use**
```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

**Problem: Database connection error**
- Make sure PostgreSQL is running
- Check your DATABASE_URL in backend/.env
- Verify database exists: `psql -U postgres -l`

**Problem: Prisma errors**
```bash
cd backend
rm -rf node_modules
npm install
npm run prisma:generate
```

## Next Steps

1. **Explore the Code**
   - Backend: `backend/src/`
   - Frontend: `frontend/src/`
   - Database schema: `backend/prisma/schema.prisma`

2. **Read Documentation**
   - README.md - Project overview
   - SETUP.md - Detailed setup guide
   - ARCHITECTURE.md - System architecture
   - PHASE1_SUMMARY.md - Implementation details

3. **Test the API**
   ```bash
   # Register a user
   curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
   
   # Login
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

4. **View Database**
   ```bash
   cd backend
   npx prisma studio
   # Opens on http://localhost:5555
   ```

## Development Workflow

```bash
# Start backend (with auto-reload)
cd backend && npm run dev

# Start frontend (with HMR)
cd frontend && npm run dev

# Build for production
cd backend && npm run build
cd frontend && npm run build
```

## User Roles

The system supports three roles:

- **ADMIN** - Full system access
- **MANAGER** - Create workflows, assign tasks
- **MEMBER** - Complete assigned tasks

Default role for new users: `MEMBER`

## API Endpoints

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token
- `GET /api/auth/profile` - Get user info (requires auth)
- `GET /health` - Check server status

## Need Help?

1. Check the logs in terminal
2. Review SETUP.md for detailed instructions
3. Check browser console for frontend errors
4. Verify all environment variables are set

## Production Deployment

Before deploying to production:

1. Set strong JWT_SECRET in .env
2. Use production database credentials
3. Enable HTTPS
4. Update CORS_ORIGIN
5. Set NODE_ENV=production
6. Run database migrations
7. Build both frontend and backend

---

**That's it! You're ready to build amazing workflows! 🚀**

For more information, check out:
- README.md - Full project documentation
- SETUP.md - Detailed setup instructions
- ARCHITECTURE.md - System design and architecture
