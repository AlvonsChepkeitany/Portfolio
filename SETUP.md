# BizFlow Setup Guide

This guide will help you set up the BizFlow workflow management system for local development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** (v14 or higher)
- **Git**

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AlvonsChepkeitany/Portfolio.git
cd Portfolio
```

### 2. Database Setup

#### Install PostgreSQL (if not already installed)

**On macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**On Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

**On Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

#### Create the Database

```bash
# Connect to PostgreSQL
psql -U postgres

# In the PostgreSQL shell:
CREATE DATABASE bizflow;
CREATE USER bizflow_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE bizflow TO bizflow_user;
\q
```

### 3. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Configure environment variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and update the following:
# - DATABASE_URL with your PostgreSQL connection string
# - JWT_SECRET with a secure random string
```

Example `.env` file:
```env
DATABASE_URL="postgresql://bizflow_user:your_secure_password@localhost:5432/bizflow?schema=public"
JWT_SECRET="your-very-secure-random-string-here"
JWT_EXPIRY="7d"
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"
```

#### Generate Prisma Client
```bash
npm run prisma:generate
```

#### Run database migrations
```bash
npm run prisma:migrate
```

This will create all the necessary tables in your database.

#### Start the backend server
```bash
# Development mode (with auto-reload)
npm run dev

# Production build
npm run build
npm start
```

The backend API will be available at `http://localhost:3001`

### 4. Frontend Setup

#### Open a new terminal and navigate to frontend directory
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Configure environment variables
```bash
# Create .env file
echo "VITE_API_URL=http://localhost:3001/api" > .env
```

#### Start the frontend development server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Verification

### 1. Test the Backend API

Open your browser or use curl to test the health endpoint:

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-01T06:30:00.000Z"
}
```

### 2. Test the Frontend

1. Open `http://localhost:5173` in your browser
2. You should see the login page
3. Click on "create a new account"
4. Fill in the registration form and create an account
5. After registration, log in with your credentials
6. You should be redirected to the dashboard

## Database Management

### View database tables

```bash
cd backend
npx prisma studio
```

This will open Prisma Studio in your browser at `http://localhost:5555`, where you can view and edit your database records.

### Create a new migration

After modifying the Prisma schema:

```bash
cd backend
npm run prisma:migrate
```

### Reset the database

**WARNING: This will delete all data!**

```bash
cd backend
npx prisma migrate reset
```

## Development Workflow

### Running both frontend and backend

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Building for production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# The built files will be in the dist/ folder
```

## Common Issues

### Issue: Port 3001 is already in use

Kill the process using port 3001:
```bash
# On macOS/Linux
lsof -ti:3001 | xargs kill -9

# On Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Issue: Database connection error

- Verify PostgreSQL is running
- Check your DATABASE_URL in backend/.env
- Ensure the database and user exist
- Verify the password is correct

### Issue: Prisma Client not generated

```bash
cd backend
npm run prisma:generate
```

### Issue: Module not found errors

```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## API Endpoints

Once the backend is running, you can access the following endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile (requires authentication)

### Health Check
- `GET /health` - Check if the server is running

## Next Steps

Now that you have the foundation set up, you can:

1. Explore the codebase in `backend/src` and `frontend/src`
2. Check the database schema in `backend/prisma/schema.prisma`
3. Review the README.md for the full project roadmap
4. Start implementing Phase 2 features (Workflow Engine)

## Getting Help

If you encounter any issues:

1. Check the logs in the terminal where the server is running
2. Review the error messages carefully
3. Check the browser console for frontend errors
4. Ensure all environment variables are set correctly

## Security Notes

- Never commit `.env` files to version control
- Use strong, random values for JWT_SECRET in production
- Change default database passwords
- Enable HTTPS in production
- Review and update CORS settings for production
