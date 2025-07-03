````markdown
# Bookstore API — Testing & Optional Features

This guide covers:

1. **Testing all endpoints** (registration, login, book CRUD)  
2. **Optional features**: filtering by genre and pagination  

---

## 🧪 1. Testing All Routes

> Base URL: `http://localhost:3000/api`  
> Make sure your server is running (`npm run dev` or `npm start`).

### 1.1 Register a New User

- **Endpoint**: `POST /register`  
- **Headers**: `Content-Type: application/json`  
- **Body**:
  ```json
  {
    "email": "alice@example.com",
    "password": "password123"
  }
````

* **Expected Response**:

  * **Status**: `201 Created`
  * **Body**:

    ```json
    {
      "id": "<new-user-uuid>",
      "email": "alice@example.com"
    }
    ```

### 1.2 Login & Obtain JWT

* **Endpoint**: `POST /login`
* **Headers**: `Content-Type: application/json`
* **Body**:

  ```json
  {
    "email": "alice@example.com",
    "password": "password123"
  }
  ```
* **Expected Response**:

  * **Status**: `200 OK`
  * **Body**:

    ```json
    {
      "token": "<your-jwt-token>"
    }
    ```
* **Next Step**: copy the `token` for protected requests.

---

### 1.3 Protected Book Routes

> **Header** for all below:
> `Authorization: Bearer <your-jwt-token>`

#### a. GET All Books

* **Endpoint**: `GET /books`
* **Example**:

  ```
  GET http://localhost:3000/api/books
  Authorization: Bearer <token>
  ```
* **Expected Response**:

  * **Status**: `200 OK`
  * **Body** (empty array on fresh data):

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

#### b. POST Create a Book

* **Endpoint**: `POST /books`
* **Headers**: `Content-Type: application/json` + Authorization
* **Body**:

  ```json
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "publishedYear": 1949
  }
  ```
* **Expected Response**:

  * **Status**: `201 Created`
  * **Body**:

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

#### c. GET a Book by ID

* **Endpoint**: `GET /books/:id`
* **Example**:

  ```
  GET http://localhost:3000/api/books/<new-book-uuid>
  Authorization: Bearer <token>
  ```
* **Expected Response**:

  * **Status**: `200 OK`
  * **Body**: the book object

#### d. PUT Update a Book

* **Endpoint**: `PUT /books/:id`
* **Headers**: `Content-Type: application/json` + Authorization
* **Body** (any fields to change):

  ```json
  {
    "genre": "Political Fiction"
  }
  ```
* **Expected Response**:

  * **Status**: `200 OK`
  * **Body**: updated book object

#### e. DELETE a Book

* **Endpoint**: `DELETE /books/:id`
* **Example**:

  ```
  DELETE http://localhost:3000/api/books/<new-book-uuid>
  Authorization: Bearer <token>
  ```
* **Expected Response**:

  * **Status**: `204 No Content`

---

## 🔎 2. Optional Features: Filtering & Pagination

The **GET `/books`** endpoint now supports:

* **Filter by genre**: `?genre=<genreName>`
* **Pagination**: `?page=<n>&limit=<m>`

### 2.1 Filter by Genre

* **Example**:

  ```
  GET http://localhost:3000/api/books?genre=Dystopian
  Authorization: Bearer <token>
  ```
* **Behavior**: returns only books whose `genre` (case‑insensitive) matches `Dystopian`.

### 2.2 Pagination

* **Example**:

  ```
  GET http://localhost:3000/api/books?page=2&limit=5
  Authorization: Bearer <token>
  ```
* **Behavior**:

  * `page` (1‑based) and `limit` control the slice of the result.
  * Defaults: `page=1`, `limit=10` if omitted.

### 2.3 Combined Usage

* **Example**:

  ```
  GET http://localhost:3000/api/books?genre=Fantasy&page=3&limit=2
  Authorization: Bearer <token>
  ```
* **Expected Response**:

  ```json
  {
    "data": [ /* up to 2 Fantasy books from page 3 */ ],
    "meta": {
      "totalCount": <number of Fantasy books>,
      "totalPages": <ceil(totalCount/2)>,
      "page": 3,
      "limit": 2
    }
  }
  ```

---
