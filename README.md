
# Schedule and Task Management API

## Overview

This project implements API endpoints for managing schedules and tasks, utilising TypeScript. It showcases a RESTful approach to handle scheduling and task management efficiently. The API allows for CRUD operations on schedules and their associated tasks, demonstrating a one-to-many relationship between the two entities.

## Features

- **Schedule Management**: Create, read, update, and delete schedules.
- **Task Management**: Manage tasks related to schedules, supporting operations like creation, retrieval, update, and deletion.

## Technologies Used

- **TypeScript**: For strong typing and modern JavaScript features.
- **PostgreSQL**: As the SQL-based database for persistent data storage.
- **Prisma**: Used as an ORM tool to interact with the database.
- **Docker**: Used for containerising services and test environments.


## Getting Started

### Prerequisites

- Node.js
- Docker
- Prisma CLI

### Setup and Installation

1. Clone the repository and navigate into the project directory.
2. Configure the `.env` file with the variables in .env.example (copy and paste will work out of the box).

3. Install the dependencies:

```
npm install
```

4. Set up the database docker container.
```
docker-compose -f compose.yml up
```

5. Run the database migrations:

```
npm run prisma:migrate
```
6. Generate the Prisma client:

```
npm run prisma:generate
```

7. Start the application: 

```
npm start
```

## Data Model

### Schedule

- **`id`**: Universally unique identifier (UUID) for the schedule.
- **`account_id`**: Integer representing the account associated with the schedule.
- **`agent_id`**: Integer representing the agent assigned to the schedule.
- **`start_time`**: DateTime indicating the start time of the schedule.
- **`end_time`**: DateTime indicating the end time of the schedule.

### Task

- **`id`**: UUID for the task.
- **`account_id`**: Integer representing the account associated with the task.
- **`schedule_id`**: UUID referencing the schedule to which the task belongs.
- **`start_time`**: DateTime indicating the start time of the task.
- **`duration`**: Integer representing the duration of the task in minutes.
- **`type`**: String enumeration with values 'break' or 'work', indicating the type of task.


## API Endpoints

### Schedule Endpoints

- **Create Schedule**:
```
POST /schedules
```

-  **Get Schedules**:
```
GET /schedules
```

-  **Update Schedule**:
```
PUT /schedules/{id}
```

-  **Delete Schedule**:
```
DELETE /schedules/{id}
```


### Task Endpoints 

-  **Create Task**:
```
POST /tasks
```

-  **Get Tasks**:
```
GET /tasks
```

-  **Update Task**:
```
PUT /tasks/{id}
```

-  **Delete Task**:
```
DELETE /tasks/{id}
```

## Tests
Run both unit and e2e tests.
- **Running All Tests**:

```
npm run test
```

## Unit Tests
Unit tests are implemented to validate the functionality of the API services.
- **Running Unit Tests**:

```
npm run test:unit
```

## E2E Tests
E2E tests are implemented to validate the functionality of the API endpoints.
- **Running E2E Tests**:

```
npm run test:e2e
```

## Future Enhancements

- Implementing additional features like filtering, sorting, and pagination for the API endpoints.
- Enhancing security measures (e.g., authentication and authorization).


