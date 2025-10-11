# Quiz Wizard — Backend

Express + MongoDB backend for storing and retrieving quizzes for the Quiz Wizard app.

- Built with `express`, `mongoose`, `cors`, `dotenv`.
- CORS allowed origins: `https://quiz-wizard-frontend.vercel.app`, `http://localhost:3000`.
- Default local server port: `5000`.

---

## Setup

- **[Prerequisites]**
  - Node.js (LTS recommended)
  - A MongoDB connection string (Atlas or local)

- **[Clone and install]**
  ```bash
  git clone <your-repo-url>
  cd Quiz-wizard-backend
  npm install
  ```

- **[Environment variables]**
  Create a `.env` file in the project root with:
  ```env
  MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
  ```
  The server uses `MONGO_URI` in `server.js` to connect to MongoDB.

- **[Run locally]**
  - Development (auto-restart via nodemon):
    ```bash
    npm run start
    ```
  - Production (plain node):
    ```bash
    npm run server
    ```
  The API will be available at `http://localhost:5000`.

---

## Architecture

```
Quiz-wizard-backend/
├─ models/
│  └─ Quiz.js         # Mongoose model: { quizId: String, body: Array }
├─ routes/
│  └─ quizRouter.js   # Quiz routes mounted at /api/quiz
├─ server.js          # Express app, CORS, MongoDB connection, route mounting
├─ package.json       # Scripts and dependencies
├─ vercel.json        # Vercel serverless deployment config
└─ .env               # MONGO_URI (not committed)
```

- **`server.js`**
  - Loads env via `dotenv`.
  - Connects to MongoDB using `process.env.MONGO_URI`.
  - Applies CORS for the specified origins and `express.json()` for JSON bodies.
  - Mounts quiz routes at `/api/quiz`.
  - Listens on port `5000` locally.

- **`models/Quiz.js`**
  - Schema:
    ```js
    { quizId: String, body: Array }
    ```

- **`routes/quizRouter.js`**
  - `POST /api/quiz/create` creates a quiz and returns `{ quizId }`.
  - `GET /api/quiz/:quizId` returns the stored `body` array or 404 if not found.

---

## API Reference

- **[Base URL (local)]** `http://localhost:5000`
- If deployed to Vercel, your base will look like: `https://<your-vercel-app>.vercel.app`

### Create a Quiz

- **Endpoint**: `POST /api/quiz/create`
- **Description**: Stores a quiz payload and returns a generated `quizId`.
- **Request Body (JSON)**:
  ```json
  {
    "body": [
      {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5"],
        "answer": "4"
      }
    ]
  }
  ```
- **Success Response (200)**:
  ```json
  { "quizId": "1739182349123" }
  ```

#### curl
```bash
curl -X POST http://localhost:5000/api/quiz/create \
  -H "Content-Type: application/json" \
  -d '{
    "body": [
      {"question": "What is 2 + 2?", "options": ["3", "4", "5"], "answer": "4"}
    ]
  }'
```

#### Postman
- Method: POST
- URL: `http://localhost:5000/api/quiz/create`
- Headers: `Content-Type: application/json`
- Body (raw JSON): as shown above

### Get a Quiz by ID

- **Endpoint**: `GET /api/quiz/:quizId`
- **Description**: Retrieves the stored `body` array for the quiz.
- **Path Params**: `quizId` — string returned by create endpoint.
- **Success Response (200)**: returns the `body` array
  ```json
  [
    {
      "question": "What is 2 + 2?",
      "options": ["3", "4", "5"],
      "answer": "4"
    }
  ]
  ```
- **Not Found (404)**:
  ```json
  { "message": "Quiz not found" }
  ```

#### curl
```bash
curl http://localhost:5000/api/quiz/<quizId>
```

#### Postman
- Method: GET
- URL: `http://localhost:5000/api/quiz/<quizId>`

---

## CORS

Configured in `server.js` to allow:
- `https://quiz-wizard-frontend.vercel.app`
- `http://localhost:3000`

If you need to test from another origin locally, you can temporarily enable the commented `app.use(cors({ origin: "*" }))` or add your origin to the array.

---

## Deployment (Vercel)

- Uses `@vercel/node` per `vercel.json`:
  ```json
  {
    "version": 2,
    "builds": [{ "src": "server.js", "use": "@vercel/node" }],
    "routes": [{ "src": "/(.*)", "dest": "/server.js" }]
  }
  ```
- Ensure `MONGO_URI` is set as a Project Environment Variable on Vercel.
- After deploy, use `https://<your-vercel-app>.vercel.app/api/quiz/...` endpoints.

---

## Scripts

- `npm run start` — start with nodemon (dev)
- `npm run server` — start with node (prod)

---

## Notes

- Port is hardcoded to `5000` in `server.js` for local runs.
- `quizId` is generated as `Date.now().toString()`; ensure uniqueness is acceptable for your use case.

