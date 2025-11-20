# Quick Setup — Eyego

This is a short, practical guide to run the project locally using Docker.

Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

Quick Start (recommended)
1. Clone and enter the repo:
```bash
git clone https://github.com/Nizar-Esmat/Eyego.git
cd Eyego
```
2. Build and start everything with Docker Compose:
```bash
docker-compose up -d --build
```
3. Wait ~30–90s, then check containers:
```bash
docker-compose ps
```
4. Check the app logs to ensure startup:
```bash
docker logs eyego-app-1
```
5. Test endpoints:
```bash
curl http://localhost:4000/api/v1/health
curl -X POST http://localhost:4000/api/v1/activities -H "Content-Type: application/json" -d '{"userId":"u1","eventType":"click","action":"tap"}'
curl "http://localhost:4000/api/v1/activities?limit=5&offset=0"
```

If something fails
- Restart services: `docker-compose restart`
- Recreate fresh state: `docker-compose down -v && docker-compose up -d --build`
- Check specific logs: `docker logs eyego-kafka-1` or `docker logs eyego-mongodb-1`

Run without Docker (advanced)
1. Install MongoDB and Kafka locally, start them.
2. Create `.env` at project root with these values:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/eventdb
KAFKA_CLIENT_ID=user-activity-service
KAFKA_BROKERS=localhost:9092
KAFKA_TOPIC=user-activity-logs
KAFKA_CONSUMER_GROUP=user-activity-consumer-group
```
3. Install deps and start the app:
```bash
npm install
npm start
```

Files & next steps
- `docker-compose.yml` — local full stack (app, kafka, zookeeper, mongodb)
- `k8s/` and `kubernetes/` — Kubernetes manifests (for cloud deploy)

Need help?
- Tell me if you want a single `docker-compose` command, a script to bootstrap everything, or automatic cloud deployment steps (GKE/EKS).

