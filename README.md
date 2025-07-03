Here's the updated README.md with your Postman documentation link added at the top, maintaining all the previous improvements:

```markdown
# Bookstore API — Testing & Optional Features


This guide covers:
1. Testing all endpoints (registration, login, book CRUD)
2. Optional features: filtering by genre and pagination

---

## 🧪 1. Testing All Routes

> **Base URL**: `http://localhost:3000/api`  
> **Note**: Ensure your server is running (`npm run dev` or `npm start`)

### 1.1 Register a New User
- **Endpoint**: `POST /register`
- **Headers**:
  ```http
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "email": "alice@example.com",
    "password": "password123"
  }
  ```
- **Expected Response**:
  - Status: `201 Created`
  - Body:
    ```json
    {
      "id": "<new-user-uuid>",
      "email": "alice@example.com"
    }
    ```

### 1.2 Login & Obtain JWT
- **Endpoint**: `POST /login`
- **Headers**:
  ```http
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "email": "alice@example.com",
    "password": "password123"
  }
  ```
- **Expected Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "token": "<your-jwt-token>"
    }
    ```
> **Important**: Copy the `token` for use in protected requests

---

### 1.3 Protected Book Routes
> **Required Header for all endpoints below**:
> ```http
> Authorization: Bearer <your-jwt-token>
> ```

#### a. Get All Books
- **Endpoint**: `GET /books`
- **Example Request**:
  ```http
  GET /api/books
  Authorization: Bearer <token>
  ```
- **Expected Response**:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "data": [],
      "meta": {
        "totalCount": 0,
        "totalPages": 0,
        "page": 1,
        "limit": 10
      }
    }
    ```

#### b. Create a Book
- **Endpoint**: `POST /books`
- **Request Body**:
  ```json
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "publishedYear": 1949
  }
  ```
- **Expected Response**:
  - Status: `201 Created`
  - Body:
    ```json
    {
      "id": "<new-book-uuid>",
      "title": "1984",
      "author": "George Orwell",
      "genre": "Dystopian",
      "publishedYear": 1949,
      "userId": "<your-user-id>"
    }
    ```

#### c. Get Book by ID
- **Endpoint**: `GET /books/:id`
- **Example Request**:
  ```http
  GET /api/books/<new-book-uuid>
  Authorization: Bearer <token>
  ```
- **Expected Response**:
  - Status: `200 OK`
  - Body: Full book object

#### d. Update a Book
- **Endpoint**: `PUT /books/:id`
- **Request Body** (partial update supported):
  ```json
  {
    "genre": "Political Fiction"
  }
  ```
- **Expected Response**:
  - Status: `200 OK`
  - Body: Updated book object

#### e. Delete a Book
- **Endpoint**: `DELETE /books/:id`
- **Example Request**:
  ```http
  DELETE /api/books/<new-book-uuid>
  Authorization: Bearer <token>
  ```
- **Expected Response**:
  - Status: `204 No Content`

---

## 🔎 2. Optional Features: Filtering & Pagination

### GET `/books` supports:
- Genre filtering: `?genre=<genreName>`
- Pagination: `?page=<n>&limit=<m>`

### 2.1 Filter by Genre
- **Example**:
  ```http
  GET /api/books?genre=Dystopian
  Authorization: Bearer <token>
  ```
- **Behavior**: Returns books with matching genre (case-insensitive)

### 2.2 Pagination
- **Example**:
  ```http
  GET /api/books?page=2&limit=5
  Authorization: Bearer <token>
  ```
- **Defaults**: 
  - `page=1` 
  - `limit=10` (when omitted)

### 2.3 Combined Usage
- **Example**:
  ```http
  GET /api/books?genre=Fantasy&page=3&limit=2
  Authorization: Bearer <token>
  ```
- **Expected Response**:
  ```json
  {
    "data": [ /* Results here */ ],
    "meta": {
      "totalCount": 25,
      "totalPages": 13,
      "page": 3,
      "limit": 2
    }
  }
  ```

  ---

## 📚 Postman Documentation
For full API testing documentation with examples:
[![Postman](https://img.shields.io/badge/View_in_Postman-orange?logo=postman&style=for-the-badge)](https://bearconnect-3881.postman.co/workspace/Bearconnect-Workspace~cdb786b7-36ce-4f4c-8c90-b5f3f84885ea/collection/42697506-b8d61268-20b5-41e6-86be-7beb02753c8b?action=share&creator=42697506)
```


