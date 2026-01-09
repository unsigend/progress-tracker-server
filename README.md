<div align="center">

<img src="public/Logo.png" alt="Progress Tracker Logo" width="400" />

</div>

# Progress Tracker Backend

Backend service for Progress Tracker, a web application that helps you track your daily reading and course progress. Customize your learning journey and monitor your progress with detailed statistics and analytics.

<div align="center">

[![API Documentation](https://img.shields.io/badge/API-Documentation-00D9FF?style=for-the-badge&logo=swagger&logoColor=white)](https://progress-tracker-kx97.onrender.com/api-docs)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

## Overview

Progress Tracker Backend is an open-source RESTful API built with NestJS, following Hexagonal Architecture principles and Domain-Driven Design (DDD). The backend provides comprehensive APIs for managing reading progress, course recordings, user authentication, and statistical analytics.

## Architecture Design

This application follows a four-layer hexagonal architecture pattern with clear separation of concerns, organized in a modular structure where each domain module encapsulates all layers.

### Module Structure

Each domain module is self-contained with its own:

- **Domain Layer**: Entities, value objects, and repository interfaces
- **Application Layer**: Use cases and business logic orchestration
- **Infrastructure Layer**: Repository implementations, data mappers, and external service integrations
- **Presentation Layer**: Controllers, DTOs, and API endpoints

Modules are composed through NestJS dependency injection, with each layer module managing its own dependencies.

### Domain Layer

Contains the core business logic, entities, value objects, and repository interfaces. This layer is framework-agnostic and represents the business domain model.

- **Entities**: Domain entities with business logic and validation
- **Value Objects**: Immutable domain concepts (e.g., `ObjectIdValueObject`, `UrlValueObject`, `ImageValueObject`)
- **Repository Interfaces**: Contracts defined in domain, implemented in infrastructure

### Application Layer

Orchestrates business operations through use cases. Manages business logic and coordinates between domain and infrastructure layers.

- **Use Cases**: Business operations organized by domain (e.g., `CreateCourseRecordingUseCase`, `FindAllCourseRecordingsUseCase`)
- **Query System**: Shared query builder with filter operators, pagination, and sorting support

### Infrastructure Layer

Implements technical concerns including database repositories, cloud storage, image processing, and external service integrations.

- **Repositories**: Prisma-based implementations of domain repository interfaces
- **Mappers**: Transform between domain entities and database models
- **Cloud Services**: AWS S3 integration for file storage
- **Image Processing**: Sharp-based image compression and optimization
- **Email Services**: Resend integration for transactional emails

### Presentation Layer

Handles HTTP requests/responses, DTOs, and API controllers. Validates input and transforms data between external and internal representations.

- **Controllers**: RESTful API endpoints with OpenAPI documentation
- **DTOs**: Request/response DTOs with class-validator decorators
- **Exception Filters**: Global exception handling for domain exceptions

### Shared Kernel

The `shared` directory provides cross-cutting concerns:

- **Base Classes**: Value objects, query system, and base repositories
- **Query System**: `QueryBase` with pagination, sorting, and nested filter support
- **Domain Exceptions**: Standardized exception hierarchy
- **Platform Utilities**: Configuration, decorators, guards, and filters

## Key Features

### Authentication & Authorization

- JWT-based authentication
- OAuth2 integration (GitHub, Google)
- Password reset via email verification codes
- User session management

### Cloud Storage

- AWS S3 integration for file and image storage
- Secure file upload with presigned URLs
- Automatic file organization and management

### Image Processing

- Automatic image compression using Sharp
- Support for JPEG, PNG, GIF, and WebP formats
- Avatar-specific compression (optimized for profile pictures)
- Image resizing with aspect ratio preservation

### Database

- PostgreSQL with Prisma ORM
- Modular schema organization by domain
- Optimized queries with proper indexing
- Transaction support for data consistency

### Statistics & Analytics

- Reading progress statistics (total minutes, pages, recordings)
- Course recording statistics with breakdown by record type
- Daily progress tracking and aggregation
- Time-based filtering and reporting

## Database Design

The application uses Prisma ORM with a modular schema approach. The database schema is organized by domain modules (user, reading, courses) and merged at build time.

Key entities:

- **User**: User accounts with authentication providers
- **Book**: Reading materials with metadata
- **UserBook**: User's reading progress tracking
- **ReadingRecord**: Daily reading recordings
- **Course**: Course definitions and metadata
- **UserCourse**: User's course enrollment and progress
- **CourseRecord**: Daily course activity recordings

## Quick Reference

### Build

```bash
npm run build
```

### Run

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

### Test

```bash
# End-to-end tests
npm run test:e2e
```

### Database

```bash
# Generate Prisma client
npm run generate:prisma

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

## API Documentation

Interactive API documentation is available at: [https://progress-tracker-kx97.onrender.com/api-docs](https://progress-tracker-kx97.onrender.com/api-docs)

The API documentation includes:

- Complete endpoint specifications
- Request/response schemas
- Authentication requirements
- Example requests and responses

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Cloud Storage**: AWS S3
- **Image Processing**: Sharp
- **Authentication**: JWT, Passport.js (GitHub, Google OAuth)
- **Email**: Resend
- **API Documentation**: Scalar API Reference

## License

This project is open source and available under the [MIT License](LICENSE) with Copyright (C) Yixiang Qiu.

## Contribution

Contributions are welcome! Please ensure all tests pass and follow the established architecture patterns. The codebase is fully open and accessible to everyone.
