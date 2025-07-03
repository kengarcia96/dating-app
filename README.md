# Dating App
A dating application Demo app

### ⚠️ Important Notes
- This is still a **work-in-progress** application
- Not all features are implemented yet
- The API endpoints are basic and may change
- Database schema is still evolving

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL
- **Language**: TypeScript

### Development Tools
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [TablePlus] or any database application you can use to view data

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dating-app
```

### 2. Set Up the Database

The easiest way to set up the database is using Docker Compose:

```bash
cd backend
docker-compose up -d
```

Since this app is currently in progress, you can access a PostgreSQL database with the following configuration (TablePlus is recommended):
- **Database**: dating_app
- **Username**: postgres
- **Password**: 143datingApp
- **Port**: 5432

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env  # if .env.example exists
```

Or create a `.env` file with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=143datingApp
DB_DATABASE=dating_app

# Application Configuration
NODE_ENV=development
PORT=3000
```

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Run the Application

#### Development Mode
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 🎯 API Endpoints

### User Registration
- **POST** `/register` - Register a new user
- **POST** `/register/complete-profile/:userId` - Complete user profile

### Request Examples

#### Register User
```json
POST /register
{
    "phoneNumber": "0917001001",
    "password": "securepassword123"
}
```

#### Complete Profile
```json
POST /register/complete-profile/{userId}
{
    "firstName": "John",
    "lastName": "Doe",
    "age": 25,
    "bio": "I love hiking and photography",
    "profilePicture": "https://example.com/profile.jpg"
}
```

## 🐳 Docker

### Database Only (For Development)
```bash
cd backend
docker-compose up -d
```