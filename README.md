# Event-Driven Microservice

Event-driven microservice using Node.js, Express, Kafka, and MongoDB for real-time user activity processing.

## Project Structure (DDD Pattern)

```
src/
├── domain/                      # Domain Layer (Business Logic)
│   └── entities/
│       └── UserActivity.js      # User activity entity
├── infrastructure/              # Infrastructure Layer (External Systems)
│   ├── database/
│   │   ├── MongoDBConnection.js # MongoDB connection
│   │   ├── UserActivitySchema.js # Mongoose schema
│   │   └── UserActivityRepository.js # Repository implementation
│   └── kafka/
│       ├── KafkaProducer.js     # Kafka producer
│       └── KafkaConsumer.js     # Kafka consumer
├── application/                 # Application Layer (Use Cases)
│   ├── usecases/
│   │   └── ActivityUseCases.js  # Activity business logic
│   └── services/
│       └── EventProcessorService.js # Event processing service
├── interfaces/                  # Interface Layer (API)
│   └── routes/
│       └── ActivityRoutes.js    # REST API routes
└── index.js                     # Application entry point
```

## Features

- **Domain-Driven Design (DDD)**: Organized in 4 layers (Domain, Infrastructure, Application, Interface)
- **Kafka Producer**: Publishes user activity events
- **Kafka Consumer**: Processes events and saves to MongoDB
- **MongoDB**: Stores activities with indexes for performance
- **REST API**: Fetch activities with pagination and filtering
- **Docker**: Containerized deployment
- **Simple Code**: Junior-friendly with basic classes and functions

## API Endpoints

### POST /api/v1/activities
Create new activity (sends to Kafka)
```bash
curl -X POST http://localhost:4000/api/v1/activities \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "eventType": "click",
    "action": "button_clicked",
    "metadata": {"button": "submit"}
  }'
```

### GET /api/v1/activities
Get all activities with pagination and filters
```bash
# Basic pagination
curl http://localhost:4000/api/v1/activities?limit=10&offset=0

# Filter by userId
curl http://localhost:4000/api/v1/activities?userId=user123

# Filter by eventType
curl http://localhost:4000/api/v1/activities?eventType=click
```

### GET /api/v1/activities/user/:userId
Get activities for specific user
```bash
curl http://localhost:4000/api/v1/activities/user/user123?limit=10
```

### GET /api/v1/health
Health check
```bash
curl http://localhost:4000/api/v1/health
```

## Environment Variables

```env
PORT=4000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/eventdb?authSource=admin
KAFKA_CLIENT_ID=user-activity-service
KAFKA_BROKERS=kafka:9092
KAFKA_TOPIC=user-activity-logs
KAFKA_CONSUMER_GROUP=user-activity-consumer-group
```

## Run with Docker

```bash
# Start all services
docker-compose up -d

# Check logs
docker logs eyego-app-1

# Stop all services
docker-compose down
```

## How It Works (DDD Flow)

1. **POST /activities** → ActivityUseCases.publishActivity() → Kafka Producer
2. **Kafka Consumer** → EventProcessorService.start() → Receives message
3. **EventProcessor** → ActivityUseCases.saveActivity() → UserActivityRepository
4. **Repository** → UserActivitySchema (Mongoose) → MongoDB
5. **GET /activities** → ActivityUseCases.getActivities() → Repository → MongoDB

### DDD Layers:
- **Domain**: UserActivity entity, Repository interface (business rules)
- **Infrastructure**: Mongoose, Kafka implementations (external tools)
- **Application**: Use cases, Event processor (orchestration)
- **Interface**: REST API routes (user interaction)

## MongoDB Indexes

- `userId + timestamp` (for user queries)
- `eventType` (for filtering by type)

## Dependencies

- express: Web framework
- mongoose: MongoDB ORM
- kafkajs: Kafka client
- dotenv: Environment variables
