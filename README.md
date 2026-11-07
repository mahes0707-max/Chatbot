# NEXORA – Learn. Build. Grow.

An AI-powered RAG chatbot platform built with the MERN stack, Python, and modern AI technologies.

NEXORA helps users interact with an intelligent knowledge assistant, retrieve relevant information from a knowledge base, manage conversations, and access useful learning resources through a clean and responsive interface.

## Overview

NEXORA features two RAG (Retrieval-Augmented Generation) implementations:

- **Python RAG:** Uses the Haystack framework for advanced document processing and retrieval.
- **JavaScript RAG:** Uses Node.js and Transformers for native JavaScript-based retrieval workflows.

Both implementations integrate with Qdrant for vector search and support LLM-powered responses.

## Key Features

### AI Chatbot
- AI-powered conversational interface.
- Retrieval-Augmented Generation (RAG).
- Google Gemini integration.
- Context-aware responses using knowledge-base retrieval.
- Conversation management.

### Dual RAG Architecture
- Python-based RAG using Haystack.
- JavaScript-based RAG using Node.js.
- Sentence Transformers embeddings.
- Qdrant vector database integration.

### User Authentication
- Google OAuth authentication.
- Session-based user authentication.
- Protected user routes.

### Chat History
- View previous conversations.
- Open and continue earlier conversations.
- Manage conversation history.
- Delete chat sessions.

### Learning Resources
- Programming and Data Structures.
- AI, Machine Learning and Data Science.
- Computer Science Fundamentals.
- Web and Software Development.
- Engineering Learning.
- Career and Placement Preparation.

### FAQ
- Simple question-and-answer interface.
- Expandable FAQ sections.
- Helpful information about using the platform.

### Backend Utilities
- Rate limiting.
- Query caching.
- Input validation and sanitization.
- Conversation management.
- Logging and error handling.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Redux Toolkit, Ant Design |
| Styling | Styled Components |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Vector Database | Qdrant |
| AI / ML | Python, Haystack, Transformers |
| Embeddings | Sentence Transformers |
| LLM | Google Gemini |
| Authentication | Google OAuth, Passport.js |
| Containerization | Docker, Docker Compose |
| Package Management | npm, pnpm |

## Architecture

```text
                  NEXORA
                     |
          React Frontend (Vite)
                     |
              Express Backend
                     |
          Authentication & APIs
                     |
          Chat Processing Layer
                     |
             RAG Integration
              /          \
       Python RAG      JavaScript RAG
       (Haystack)       (Node.js)
              \          /
               Qdrant
                     |
              LLM Provider
               (Gemini)
                     |
             AI Chat Response

        MongoDB - Users & Chat History
```

## Project Structure

```text
Chatbot/
│
├── backend/
│   ├── python_scripts/
│   │   ├── rag_chatbot.py
│   │   └── requirements.txt
│   │
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── .env.example
│   └── startup.sh
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── containers/
│       │   ├── ChatBot/
│       │   └── DefaultLayout/
│       ├── services/
│       └── view/
│
├── docker-compose.yml
└── README.md
```

*The structure above highlights the main project areas; additional files and modules may exist.*

## Getting Started

### Prerequisites

- Git
- Docker Desktop and Docker Compose
- Google Gemini API key
- Google OAuth credentials (for Google sign-in)

For manual installation, Node.js, pnpm, Python, MongoDB, and Qdrant are also required.

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd Chatbot
```

### 2. Configure Environment Variables

Create your backend environment file using the example:

```bash
cp backend/.env.example backend/.env
```

On Windows PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

Update the required values in `backend/.env`:

- MongoDB connection settings.
- Google Gemini API key.
- Google OAuth client credentials.
- Qdrant connection settings.
- Other environment variables required by the application.

**Important:** Never commit `.env` files, API keys, OAuth secrets, or session credentials to GitHub.

### 3. Start with Docker

From the project root:

```bash
docker compose up -d --build
```

Check the running containers:

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs -f
```

Stop the services:

```bash
docker compose down
```

### 4. Access the Application

| Service | URL |
|---|---|
| NEXORA Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Qdrant Dashboard | http://localhost:6333/dashboard |
| MongoDB | localhost:27017 |

Make sure your required environment variables and OAuth configuration are set before using the application.

## RAG Implementations

### Python RAG – Haystack

The Python implementation provides document processing and retrieval capabilities.

**Technologies:**
- Python
- Haystack
- Sentence Transformers
- Qdrant

**Key capabilities:**
- Document processing.
- Embedding generation.
- Vector-based retrieval.
- Context-aware response generation.

### JavaScript RAG – Node.js

The JavaScript implementation provides a native Node.js RAG workflow.

**Technologies:**
- Node.js
- JavaScript
- @xenova/transformers
- Qdrant REST API

**Key capabilities:**
- JavaScript-based document processing.
- Embedding generation.
- Vector search.
- LLM integration.

## API Endpoints

The following endpoints are documented by the project:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/google` | Initiate Google authentication |
| GET | `/api/auth/me` | Get current authenticated user |
| POST | `/api/auth/logout` | Log out |
| POST | `/api/chat/message` | Send a chat message |
| GET | `/api/chat/sessions` | Retrieve chat sessions |
| GET | `/api/chat/sessions/:sessionId/messages` | Retrieve session messages |
| DELETE | `/api/chat/sessions/:sessionId` | Delete a chat session |
| GET | `/api/chat/templates` | Retrieve conversation templates |
| GET | `/api/health` | Health check |

Authentication-protected endpoints require a valid user session.

## Testing and Benchmarking

The project README previously documented the following test commands:

```bash
npm test

npm run test:compare

npm run test:js

npm run test:python

npm run health:check
```

Run these commands from the directory containing the corresponding npm scripts.

### Historical Benchmark Snapshot

The existing project benchmark, dated September 19, 2025, reported:

| Metric | JavaScript RAG | Python RAG |
|---|---:|---:|
| Successful tests | 4/4 | 4/4 |
| Execution time | 24.6 seconds | 52.8 seconds |
| Reported success rate | 100% | 100% |

The original benchmark reported JavaScript RAG as approximately 53% faster in that test environment. These are historical project-reported results, not a guarantee of current performance.

## Security

- Keep API keys and OAuth credentials in environment variables.
- Never commit `.env` files.
- Use authentication middleware for protected routes.
- Validate and sanitize user input.
- Configure production secrets securely.
- Restrict access to database and vector-store services.

## Future Improvements

- Additional LLM provider integrations.
- Improved document upload and knowledge-base management.
- Advanced RAG evaluation.
- Enhanced conversation management.
- More learning and placement resources.
- Deployment to a cloud platform.

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test your changes.
5. Submit a pull request.

## License

Add your preferred open-source license here.

---

**NEXORA – Learn. Build. Grow.**

An intelligent learning and knowledge assistant powered by AI.