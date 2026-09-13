# SkillStage — Project Discovery & Showcase Platform

SkillStage is a full-stack project discovery and showcase platform designed to help developers **find, explore, and showcase software projects** based on their interests, technologies, and project requirements.

Instead of relying only on traditional keyword-based search, SkillStage uses **semantic search, advanced filtering, and project similarity-based recommendations** to help users discover projects that are genuinely relevant to their technology stack and interests.

---

## 🚀 Features

### 🔎 Semantic Project Search

Search for projects using natural-language queries rather than relying only on exact keyword matches.

For example:

> "Find backend projects using Node.js and PostgreSQL"

The search system identifies projects based on their **meaning, technologies, categories, and project descriptions**, allowing relevant projects to be discovered even when they don't contain the exact search keywords.

---

### 🎯 Advanced Project Filtering

Users can refine search results using multiple project attributes, including:

- Technology / Tech Stack
- Project Category
- Domain
- Project Type
- Difficulty Level
- Other project metadata

Semantic search can be combined with filters to narrow down results and find projects matching specific requirements.

---

### 💡 Project Recommendations

SkillStage provides similar and recommended projects based on project characteristics such as:

- Technology overlap
- Project category
- Domain
- Semantic similarity
- User interactions
- Project popularity
- Recency

This creates a personalized project discovery experience instead of showing projects only in a static order.

---

👨‍💻 Project Showcase

Developers can create project profiles containing:

Project title
Description
Technologies used
Project category
Features
Demo images
Demo videos
GitHub repository
Project links

This provides developers with a centralized platform to showcase their work.

🔐 Authentication & Authorization

Implemented secure user authentication using:

JWT-based authentication
Protected API routes
User-specific project management
Authentication middleware
☁️ Media Management

Project images and videos are uploaded and managed using:

Multer for handling multipart form data
Cloudinary for cloud-based media storage and delivery
🏗️ System Architecture
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │   Tailwind CSS UI   │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST
                               ▼
                    ┌─────────────────────┐
                    │   Express.js API    │
                    │     Node.js         │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼─────────────────┐
              │                │                 │
              ▼                ▼                 ▼
       ┌────────────┐   ┌──────────────┐  ┌───────────────┐
       │  MongoDB   │   │ Search &     │  │  Cloudinary   │
       │  Database  │   │ Recommendation│ │ Media Storage │
       └────────────┘   │    Engine    │  └───────────────┘
                        └──────────────┘
🔍 Semantic Search Pipeline

The semantic search workflow follows:

User Query
    │
    ▼
Query Processing
    │
    ▼
Embedding Generation
    │
    ▼
Vector Similarity Search
    │
    ▼
Candidate Projects
    │
    ▼
Advanced Filters
    │
    ▼
Relevance Ranking
    │
    ▼
Search Results

This allows SkillStage to retrieve projects based on semantic relevance rather than exact keyword matching alone.

🧠 Recommendation Engine

The recommendation system uses a hybrid scoring approach.

                    Recommendation Engine
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
      Semantic Similarity  Tech Overlap    User Activity
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                       Ranking Score
                              │
                              ▼
                  Recommended Projects

A project can receive a higher recommendation score when it shares:

Similar technologies
Similar project domains
Similar descriptions
Similar categories
Strong user interaction signals

The architecture is designed so additional recommendation signals can be incorporated later.

🗄️ MongoDB

MongoDB is used as the primary database for storing application data.

The database manages entities such as:

Users
Projects
Technologies
Categories
Interactions
Search Metadata

MongoDB is also used to support project filtering and retrieval workflows, while vector search capabilities are used for semantic project discovery.

🛠️ Tech Stack
Frontend
React.js
Tailwind CSS
Backend
Node.js
Express.js
REST APIs
JWT Authentication
Database & Search
MongoDB
MongoDB Atlas Vector Search
Vector Embeddings
Similarity Search
Media
Cloudinary
Multer
Development
Git
GitHub
Postman
📁 Project Structure
SkillStage/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── ...
│
├── README.md
└── ...
⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/Nehayp21242929/skillstage-where-skills-take-center-stage1.git

cd skillstage-where-skills-take-center-stage1
2. Install dependencies

Install frontend dependencies:

cd client
npm install

Install backend dependencies:

cd ../server
npm install
3. Configure environment variables

Create a .env file inside the backend directory.

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Add your embedding/vector-search configuration if required

Do not commit .env files or API credentials to GitHub.

4. Start the backend
cd server
npm run dev
5. Start the frontend

Open another terminal:

cd client
npm run dev

The application will be available at the local development URL shown by Vite.

🔌 API Overview

The backend exposes RESTful APIs for managing users, projects, search, and recommendations.

Example endpoints:

Authentication
POST   /api/auth/register
POST   /api/auth/login

Projects
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

Search
GET    /api/projects/search

Recommendations
GET    /api/projects/:id/similar
GET    /api/recommendations

Endpoint paths may vary depending on the current implementation.

🔮 Future Improvements

Planned improvements include:

Personalized recommendation profiles
Improved ranking algorithms
Collaborative filtering
Search analytics
Project popularity scoring
GitHub repository integration
Developer profiles
Project bookmarking
Recommendation explanations
Recommendation evaluation using offline metrics
Scalable search infrastructure
🎯 Problem Statement

Developers often build projects but struggle to discover relevant projects that match a particular technology stack, domain, or problem space.

Traditional keyword search can return either too many irrelevant projects or miss projects that are conceptually related but use different terminology.

SkillStage addresses this problem by combining:

Semantic Search
       +
Advanced Filtering
       +
Project Similarity
       +
Recommendations

to make project discovery more relevant and personalized.

📌 Key Engineering Highlights
Full-stack MERN application
RESTful backend architecture
JWT-based authentication
MongoDB data modeling and querying
Semantic vector search
Advanced multi-criteria filtering
Project similarity and recommendation engine
Cloud-based media storage
Modular backend architecture
Search and recommendation-oriented data processing
├── Retail Analytics
├── Stock Prediction System
└── Supply Chain Optimizer
