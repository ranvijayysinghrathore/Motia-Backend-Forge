# 🚀 Quick Start Guide - Motia Backend Forge

Get your backend generator running in 2 minutes!

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn

---

## Step 1: Start the Backend

```bash
# You're already in the backend-forge directory
npm run dev
```

**Expected Output**:
```
🚀 Server ready and listening on port 3000 (or 3001)
🔗 Open http://localhost:3000 to open workbench 🛠️
```

**Note**: If port 3000 is busy, Motia will automatically use 3001. Check your terminal output!

**What's Running**:
- Motia runtime
- Workbench UI for workflow visualization
- All meta-workflow Steps registered
- All template workflows ready

---

## Step 2: Start the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm run dev
```

**Expected Output**:
```
VITE v7.3.0  ready in 423 ms

➜  Local:   http://localhost:5173/
```

---

## Step 3: Generate Your First Backend

1. **Open** `http://localhost:5173` in your browser

2. **Enter** a project description:
   ```
   A simple app with users, posts, and comments
   ```

3. **Click** "Generate Backend"

4. **Watch** the loading animation with progressive status messages

5. **Receive** your backend:
   - Backend URL: `https://backend-xyz.motia.cloud`
   - Available endpoints:
     - `POST /users`
     - `POST /posts`
     - `GET /posts`
     - `PUT /posts/:id`
     - `DELETE /posts/:id`

---

## Step 4: Explore the Workbench

1. **Open** `http://localhost:3000` in your browser

2. **Navigate** to the "Flows" tab

3. **View** registered workflows:
   - `forge-backend` - Meta-workflow
   - `user-management` - User signup
   - `entity-management` - CRUD operations
   - `background-jobs` - Async processing
   - `error-handling` - Retry logic
   - `scheduled-tasks` - Cron jobs

4. **Click** on any flow to see:
   - Step connections
   - Event emissions
   - Configuration details

---

## Step 5: Test the API Directly

You can also call the backend API directly:

```bash
curl -X POST http://localhost:3000/forge-backend \
  -H "Content-Type: application/json" \
  -d '{"description": "A simple app with users and posts"}'
```

**Response**:
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

## 🎯 Try These Descriptions

1. **"A social app with users and posts"**
   - Basic social network

2. **"An app with products, orders, and notifications"**
   - E-commerce style

3. **"A simple app with background job processing"**
   - Emphasizes async features

4. **"An app with scheduled analytics and cron tasks"**
   - Highlights scheduled features

---

## 🔍 Troubleshooting

### Backend won't start

**Issue**: Port 3000 already in use

**Solution**:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in motia.config.ts
```

---

### Frontend won't start

**Issue**: Port 5173 already in use

**Solution**:
```bash
# Vite will automatically try port 5174
# Or manually specify:
npm run dev -- --port 5174
```

---

### "Cannot connect to backend"

**Issue**: Frontend can't reach backend

**Solution**:
1. Check backend is running on port 3000
2. Verify `frontend/.env` has correct URL:
   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```
3. Restart frontend after changing .env

---

## 📚 Next Steps

- Read the full [README.md](file:///d:/Programs/backend-forge/README.md)
- Explore the [walkthrough](file:///C:/Users/ASUS/.gemini/antigravity/brain/15f1f00b-90c0-43e6-8928-2449b7cf3c3e/walkthrough.md)
- Check out the [implementation plan](file:///C:/Users/ASUS/.gemini/antigravity/brain/15f1f00b-90c0-43e6-8928-2449b7cf3c3e/implementation_plan.md)

---

**You're all set! Start forging backends! 🔥**
