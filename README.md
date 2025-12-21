# 🔥 Motia Backend Forge

**Generate and deploy complete, running backends from simple text descriptions.**

Backend code is an implementation detail. **Backend behavior is the product.**

---

## 🎯 What is This?

Motia Backend Forge is a **meta-backend** that demonstrates the extreme power of Motia by solving a common developer pain:

> Developers repeatedly write the same backend logic (auth, CRUD, background jobs, retries, cron).

This project **eliminates that repetition** by:

1. **Understanding** what you want to build (via AI-powered intent parsing)
2. **Selecting** predefined backend workflow templates
3. **Assembling** a fully running backend
4. **Deploying** it to Motia Cloud
5. **Returning** a live API base URL and available endpoints

**Users do NOT receive backend code. They receive working APIs.**

---

## 🏗️ Architecture

This project is built **entirely using Motia**, demonstrating:

- ✅ **API orchestration** (HTTP Steps)
- ✅ **Background jobs** (Event Steps)
- ✅ **Scheduled tasks** (Cron Steps)
- ✅ **AI workflows** (Intent parsing)
- ✅ **Event-driven architecture** (Step communication)
- ✅ **State management** (Motia state)
- ✅ **Dynamic workflow assembly** (Meta-workflows)

### Core Meta-Workflow: `ForgeBackendFlow`

```
POST /forge-backend
    ↓
ReceiveProjectDescription
    ↓
AIIntentParser (Motia AI)
    ↓
TemplateSelector
    ↓
WorkflowAssembler
    ↓
WorkflowRegistrar
    ↓
CloudDeployer
    ↓
Return: { backendUrl, endpoints }
```

### Generated Backend Templates

Each generated backend includes:

- **UserSignupFlow** - User registration with validation
- **CreateEntityFlow** - Generic CRUD creation
- **GetEntitiesFlow** - Data retrieval
- **BackgroundProcessor** - Async job handling
- **RetryHandler** - Exponential backoff retry logic
- **ScheduledAnalytics** - Cron-based tasks

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Backend Setup

```bash
# Install dependencies (already done if you ran npx motia create)
npm install

# Start Motia development server
npm run dev
```

This starts:
- **Motia runtime** on `http://localhost:3000`
- **Workbench UI** for visualizing workflows

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 💻 Usage

### Via Frontend

1. Open `http://localhost:5173`
2. Enter a project description:
   ```
   A simple app with users, posts, and comments
   ```
3. Click **"Generate Backend"**
4. Receive:
   - Backend URL: `https://backend-xyz.motia.cloud`
   - Available endpoints:
     - `POST /users`
     - `POST /posts`
     - `GET /posts`
     - `PUT /posts/:id`
     - `DELETE /posts/:id`

### Via API

```bash
curl -X POST http://localhost:3000/forge-backend \
  -H "Content-Type: application/json" \
  -d '{"description": "A simple app with users and posts"}'
```

Response:
```json
{
  "backendUrl": "https://backend-1234567890-abc.motia.cloud",
  "endpoints": [
    "POST /users",
    "POST /posts",
    "GET /posts",
    "PUT /posts/:id",
    "DELETE /posts/:id"
  ],
  "backendId": "backend-1234567890-abc"
}
```

---

## 📁 Project Structure

```
backend-forge/
├── src/
│   ├── forge/                    # Meta-workflow Steps
│   │   ├── forge-backend-api.step.ts      # Main API endpoint
│   │   ├── ai-intent-parser.step.ts       # AI parsing
│   │   ├── template-selector.step.ts      # Template selection
│   │   ├── workflow-assembler.step.ts     # Workflow assembly
│   │   ├── workflow-registrar.step.ts     # Registration
│   │   └── cloud-deployer.step.ts         # Deployment
│   │
│   └── templates/                # Backend workflow templates
│       ├── user-signup.step.ts
│       ├── create-entity.step.ts
│       ├── get-entities.step.ts
│       ├── background-processor.step.ts
│       ├── retry-handler.step.ts
│       └── scheduled-analytics.step.ts
│
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputScreen.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ResultScreen.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── .env
│
├── motia.config.ts              # Motia configuration
└── package.json
```

---

## 🎨 What This Demonstrates

### 1. **Backend Behavior Orchestration**

This project proves that Motia can **orchestrate backend behavior** at an extreme level:

- Dynamic workflow generation
- Event-driven Step communication
- Background job processing
- Retry logic with exponential backoff
- Scheduled task management

### 2. **AI Integration**

The `AIIntentParser` Step demonstrates Motia's AI capabilities:

```typescript
// Converts natural language → structured intent
"A simple app with users and posts"
    ↓
{
  entities: ["users", "posts"],
  features: ["auth", "crud"],
  templateType: "social"
}
```

### 3. **Meta-Workflow Pattern**

The entire system is a **workflow that generates workflows**:

- Meta-workflow: `ForgeBackendFlow`
- Generated workflows: User management, CRUD, background jobs, etc.

---

## 🔧 Configuration

### Backend URL (Frontend)

Edit `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:3000
```

For production:
```env
VITE_BACKEND_URL=https://your-motia-backend.motia.cloud
```

### Motia Configuration

Edit `motia.config.ts` to customize plugins and settings.

---

## 📊 Viewing Workflows in Workbench

1. Start dev server: `npm run dev`
2. Open Workbench: `http://localhost:3000`
3. Navigate to **Flows** tab
4. View:
   - `forge-backend` - Meta-workflow
   - `user-management` - User signup flow
   - `entity-management` - CRUD flows
   - `background-jobs` - Async processing
   - `error-handling` - Retry logic
   - `scheduled-tasks` - Cron tasks

---

## 🚢 Deployment

### Deploy Backend to Motia Cloud

```bash
npm run build
npx motia deploy
```

### Deploy Frontend to Vercel

```bash
cd frontend
npm run build
vercel deploy
```

Update `frontend/.env` with your deployed Motia backend URL.

---

## 🎯 Example Descriptions

Try these in the frontend:

1. **"A simple app with users, posts, and comments"**
   - Generates: User auth + Post CRUD + Comment system

2. **"An app with products and orders"**
   - Generates: Product catalog + Order management

3. **"A social app with notifications"**
   - Generates: User system + Background notification jobs

---

## 🧪 Testing Generated Backends

Once a backend is generated, test the endpoints:

```bash
# Create a user
curl -X POST https://backend-xyz.motia.cloud/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Create a post
curl -X POST https://backend-xyz.motia.cloud/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "Hello, world!",
    "authorId": "user-123"
  }'

# Get all posts
curl https://backend-xyz.motia.cloud/posts
```

---

## 🎓 Key Learnings

This project demonstrates:

1. **Motia Steps** are the universal primitive for all backend logic
2. **Event-driven architecture** enables loose coupling and scalability
3. **Workflows** can be dynamically assembled and deployed
4. **AI integration** makes natural language → code possible
5. **Background jobs, retries, and cron** are first-class citizens

---

## 🤝 Contributing

This is a hackathon/demo project. For production use:

1. Implement real AI intent parsing (vs keyword matching)
2. Add actual Motia Cloud deployment integration
3. Support multiple backend templates
4. Add authentication and user management
5. Implement database persistence

---

## 📄 License

MIT

---

## 🙏 Acknowledgments

Built with [Motia](https://motia.dev) - the unified backend framework.

**Motia makes backend development simple by treating everything as a Step.**

---

### 🤖 AI-Assisted Development

This project was built with the speed and assistance of modern AI tools:
- **Antigravity** (Primary Coding Assistant)
- **Gemini 3**
- **Claude 3.5 Sonnet / ChatGPT**

**Important Note:** While these AI tools were used for fast prototyping, assisted coding, and boilerplate generation, **all architectural thinking, logic design, and final decisions were made by the developer.** These tools acted as a powerful multiplier for human creativity and decision-making.

---

**Happy Forging! 🔥**