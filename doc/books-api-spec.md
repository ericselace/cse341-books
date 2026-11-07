Feature Understanding

Purpose

The purpose of this feature is to develop a read-only RESTful API that allows clients to retrieve book information stored in a MongoDB database.

Core Requirements

The API must support the following operations:

Retrieve All Books

HTTP Method: GET

Endpoint: /books

Expected behavior: Return all books stored in the database as a JSON array.

Retrieve a Single Book by ID

HTTP Method: GET

Endpoint: /books/:id

Expected behavior: Return the book that matches the provided ID as a JSON object.

If the book does not exist, return an HTTP 404 status.

Scope

This feature is limited to retrieving book information.

Creating, updating, and deleting books are outside the scope of this feature.


RESTful API

The API uses HTTP GET requests to retrieve book data:

GET /books: Retrieves all books.

GET /books/:id: Retrieves one book by ID.

JSON Responses

All API responses use JSON format. The books endpoint returns an array, while the single-book endpoint returns an object.

HTTP Status Codes

200 OK: Request successful.

404 Not Found: Book does not exist.

500 Internal Server Error: Unexpected server error.

Database

MongoDB stores book documents in the books collection. Express.js handles API requests and responses.

Security

Store database credentials in environment variables.

Exclude .env from GitHub.

Do not expose internal database errors to clients.




 Version 1 – Books API Specification

Purpose

Create a read-only API to retrieve book data from MongoDB.

Data Model

Each book contains:

id: string

author: string

title: string

publicationDate: string

Endpoints

1. Get All Books

Method: GET

Route: /books

Description: Returns all books.

Success status: 200 OK

2. Get One Book by ID

Method: GET

Route: /books/:id

Description: Returns one book matching the provided ID.

Success status: 200 OK

Not found status: 404 Not Found

Initial Assumptions

Data is stored in a MongoDB collection named books.

The API returns JSON responses.

Each book has a unique ID.




Version 1 Evaluation

1. Are there any bugs or short-sighted decisions?

Yes. The publication date format is not defined, and the API does not specify how invalid IDs are handled.

2. Are there any security concerns that are missing?

Yes. The API should not expose database credentials, internal error details, or stack traces to clients.

3. Are there any parts of the current route design that might be slow?

Yes. Retrieving all books without limiting the results may become slow as the database grows. Pagination and field projection could improve performance.

4. Are any response examples or error behaviors unclear?

Yes. The specification does not include JSON response examples or define the response body for server errors and missing books.

Evaluation Improvements

Define the publication date format.

Validate book IDs.

Use consistent JSON error responses.

Avoid exposing internal server details.

Consider pagination for large collections.




 Version 2 – Improved Books API Specification

Purpose

Build a read-only REST API using Express.js and MongoDB to retrieve book information.

Database

Database: cse341-books-db

Collection: books

Data Model

Each book must contain:

id: String, required.

author: String, required.

title: String, required.

publicationDate: String in ISO 8601 format (YYYY-MM-DD), required.

Endpoints

1. Get All Books

Method: GET

Route: /books

Description: Returns all books as a JSON array.

Success status: 200 OK

Error status: 500 Internal Server Error

Success Response:

[
  {
    "id": "b1",
    "author": "Maya Rivera",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  }
]

2. Get One Book by ID

Method: GET

Route: /books/:id

Description: Returns one book matching the provided ID.

Success status: 200 OK

Not found status: 404 Not Found

Error status: 500 Internal Server Error

Success Response:

{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}

Not Found Response:

{
  "message": "Book not found"
}

Error Handling

Invalid IDs must be handled without crashing the server.

Internal database errors must not be exposed to clients.

Return a generic message for server errors:

{
  "message": "Internal server error"
}

Security

Store the MongoDB connection string in an environment variable.

Exclude .env from Git using .gitignore.

Never expose database credentials or stack traces in API responses.

Performance

Return only the required book fields.

Use pagination if the collection becomes large.

Ensure book IDs are indexed when appropriate.

Out of Scope

Creating books (POST).

Updating books (PUT/PATCH).

Deleting books (DELETE).

Authentication and authorization.




Improvements from Version 1 to Version 2

Version 2 improves Version 1 by:

Defining required fields and the publication date format.

Providing clear JSON response examples.

Specifying HTTP status codes for success and errors.

Defining consistent error messages.

Adding security and performance considerations.

Clarifying the scope of the API.