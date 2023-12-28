# Course Review

This is a small back-end project for course and review related information in MongoDB. Use postman to test it.

## Technologies:

- TypeScript
- Mongoose
- Express.js

## Endpoints:

### 1.Create a course

- Endpoint: `/api/course`
- Method: POST

### 2.Get all courses with pagination and filtering

- Endpoint: `/api/courses`
- Method: GET

### 3.Create a Category

- Endpoint: `/api/categories`
- Method: POST

### 4.Get All Categories

- Endpoint: `/api/categories`
- Method: GET

### 5.Create a Review

- Endpoint: `/api/reviews`
- Method: POST

### 6.Update a Course (Partial Update with Dynamic Update)

- Endpoint: `/api/courses/:courseId`
- Method: PUT

### 7.Get Course by ID with Reviews

- Endpoint: `/api/courses/:courseId/reviews`
- Method: GET

### 8.Get the Best Course Based on Average Review (Rating)

- Endpoint: `/api/course/best`
- Method: GET

## Dependencies

- cors: ^2.8.5
- dotenv: ^16.3.1
- express: ^4.18.2
- mongoose: ^8.0.1
- http-status": ^1.7.3,
- lint-staged": ^15.1.0,
- zod: ^3.22.4

## Dev Dependencies

- @types/bcrypt: ^5.0.2
- @types/cors: ^2.8.16
- @types/express: ^4.17.21
- @typescript-eslint/eslint-plugin: ^6.11.0
- @typescript-eslint/parser: ^6.11.0
- eslint: ^8.53.0
- eslint-config-prettier: ^9.0.0
- prettier: ^3.1.0
- ts-node-dev: ^2.0.0
- typescript: ^5.2.2

## 1.Installation

Run `npm install` to install project dependencies.

## 2.Environment setup

Create a `.env` file and put your environment variable there. Save the following variable:

NODE_ENV=development
PORT=Your port
DATABASE_URL=Your MongoDB Atlas URL

## Usage

Run `npm run dev` to run the project locally.

### Api Link : (https://course-review-beta.vercel.app/)
