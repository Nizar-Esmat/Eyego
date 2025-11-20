# Event-Driven Microservice

Event-driven microservice using Node.js, Express, Kafka, and MongoDB for real-time user activity processing.

## Project Structure

```
src/
├── infrastructure/              # External Systems (Database, Kafka)
│   ├── database/
│   │   ├── MongoDBConnection.js # MongoDB connection
│   │   ├── UserActivitySchema.js # Mongoose schema
│   │   └── UserActivityRepository.js # Database operations
│   └── kafka/
│       ├── KafkaProducer.js     # Kafka producer
│       └── KafkaConsumer.js     # Kafka consumer
├── application/                 # Business Logic
│   ├── usecases/
│   │   └── ActivityUseCases.js  # Activity operations
│   └── services/
│       └── EventProcessorService.js # Event processing
├── interfaces/                  # API Routes
│   └── routes/
│       └── activities.routes.js # REST endpoints
└── index.js                     # Application entry point
```

## Features

- **Kafka Producer**: Publishes user activity events
- **Kafka Consumer**: Processes events and saves to MongoDB
- **MongoDB**: Stores activities with indexes for performance
- **REST API**: Fetch activities with pagination and filtering
- **Docker**: Containerized deployment
- **Simple Code**: Function-based, junior-friendly

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

## How It Works

1. **POST /activities** → ActivityUseCases.publishActivity() → Kafka Producer
2. **Kafka Consumer** → EventProcessorService.start() → Receives message
3. **EventProcessor** → ActivityUseCases.saveActivity() → Repository
4. **Repository** → MongoDB (via Mongoose)
5. **GET /activities** → ActivityUseCases.getActivities() → Repository → MongoDB

### Architecture:
- **Routes**: Handle HTTP requests
- **Use Cases**: Business logic (publish, save, get activities)
- **Repository**: Database operations
- **Kafka**: Event streaming
- **MongoDB**: Data storage

## MongoDB Indexes

- `userId + timestamp` (for user queries)
- `eventType` (for filtering by type)

## Dependencies

- express: Web framework
- mongoose: MongoDB ORM
- kafkajs: Kafka client
- dotenv: Environment variables
