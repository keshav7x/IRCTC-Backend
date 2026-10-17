<h1>IRCTC Backend</h2>

<br>
A railway ticket booking backend inspired by IRCTC, built to explore real-world backend engineering, microservices architecture, and distributed systems.




The project focuses on the challenges behind a railway reservation platform: managing users, searching trains, handling concurrent seat bookings, processing payments, and coordinating independent services reliably.


<h2> Overview </h2>

IRCTC Backend is a microservices-based railway reservation system designed around independently deployable services, explicit service boundaries, and reliable communication between components.

The system combines synchronous HTTP APIs for request-response operations with asynchronous event-driven communication for workflows that span multiple services.

The primary engineering goal is to understand how production-style backend systems are designed, built, and operated.

Architecture

```TS

                       Client
                          |
                          v
                     API Gateway
                          |
          +---------------+----------------+
          |               |                |
          v               v                v
     User Service   Search Service   Booking Service
          |               |                |
          |               |                v
          |               |         Inventory Service
          |               |                |
          |               |                v
          |               |         Seat Management
          |               |
          |               v
          |         Elasticsearch
          |
          v
      PostgreSQL

              Booking / Payment Workflow
                          |
                          v
                   Payment Service
                          |
                          v
                     Payment Provider

              Asynchronous Event Flow
                          |
                          v
                         Kafka
                          |
             +------------+------------+
             |                         |
             v                         v
      Notification Service       Other Consumers

       Redis: caching, temporary seat holds,
              OTPs, and session-related data

```

This diagram represents the intended logical architecture. The implementation may evolve as services are developed.

Services

Service

Responsibility

API Gateway

Entry point for client requests, routing, and cross-cutting concerns

User Service

Registration, authentication, and user profiles

Search Service

Train and journey search

Inventory Service

Seat availability, temporary holds, and inventory consistency

Booking Service

Booking lifecycle and coordination

Payment Service

Payment initiation, verification, and status tracking

Admin Service

Administrative operations and railway data management

Notification Service

Email and booking-related notifications

Each service should own its business logic and data boundaries. Services should communicate through well-defined APIs or asynchronous events rather than directly accessing another service's database.

Technology Stack

The stack may evolve as the project develops.

Runtime: Node.js or Bun

Language: TypeScript

Backend framework: Fastify

Database: PostgreSQL

ORM: Prisma or Drizzle

Caching and coordination: Redis

Messaging: Apache Kafka

Search: Elasticsearch

Containerization: Docker and Docker Compose

Authentication: JWT access and refresh tokens

Testing: Unit, integration, and end-to-end tests

Core Engineering Challenges

1. Authentication and authorization

Secure registration, password hashing, token validation, refresh flows, and role-based access control.

2. Train and journey search

Model stations, routes, schedules, and station-to-station journeys while supporting efficient search.

3. Concurrent seat booking

Prevent two users from successfully reserving the same seat under concurrent requests.

4. Distributed transactions

Coordinate booking, inventory, and payment operations across independent services. Explore the Saga pattern and compensating actions when a workflow fails.

5. Event-driven communication

Use Kafka to publish domain events and decouple workflows such as notifications and booking updates.

6. Reliability and fault tolerance

Handle timeouts, retries, duplicate messages, idempotency, dead-letter queues, and partial service failures.

7. Observability

Introduce structured logging, health checks, metrics, tracing, and useful operational diagnostics.

Development Principles

Build incrementally, starting with a working vertical slice.

Keep service responsibilities explicit.

Give each service ownership of its data.

Validate inputs at API boundaries.

Use database constraints as well as application-level checks.

Design retryable operations to be idempotent.

Treat payment and booking state transitions carefully.

Test failure scenarios, not just successful requests.

Avoid introducing infrastructure before its need is clear.

Project Structure

The repository will grow as services are introduced. A possible structure is:

```
irctc-backend/
├── services/
│   ├── api-gateway/
│   ├── user-service/
│   ├── search-service/
│   ├── booking-service/
│   ├── inventory-service/
│   ├── payment-service/
│   ├── admin-service/
│   └── notification-service/
├── packages/
│   └── shared/
├── infrastructure/
│   └── docker/
├── docs/
├── docker-compose.yml
└── README.md
```


The structure is a proposed starting point, not a requirement to create every service immediately.

Getting Started

Prerequisites

Install the tools required for the services you are implementing:

Git

Bun or Node.js

Docker and Docker Compose

PostgreSQL

Redis

Kafka and Elasticsearch can be introduced when the corresponding workflows are implemented.

Setup

Clone the repository:

git clone  https://github.com/keshav7x/IRCTC-Backend.git
<br>
cd irctc-backend

Install dependencies according to the package manager and workspace configuration used by the project.

Configure environment variables for the services you intend to run. Keep secrets out of version control and provide an .env.example documenting the required configuration.

Start only the required infrastructure and services during early development.

Detailed setup instructions will be added as the architecture and service configurations stabilize.

Development Roadmap

Establish project structure and development conventions

Implement the User Service

Design the railway domain and database schemas

Introduce API Gateway routing

Implement train and journey search

Build inventory and seat reservation logic

Implement booking lifecycle management

Integrate payment processing

Introduce Kafka-based event communication

Add notifications and search indexing

Add integration tests and failure simulations

Improve observability, security, and deployment workflows

Learning Objectives

This project is an opportunity to develop practical experience with:

Backend architecture and API design

Relational data modeling and transactions

Concurrency control and race conditions

Microservices communication

Event-driven architecture

Distributed transaction patterns

Idempotency and fault tolerance

Caching, search, and background processing

Testing and operating distributed applications
