import 'dotenv/config';
import express from 'express';
import MongoDBConnection from './infrastructure/database/MongoDBConnection.js';
import UserActivityRepository from './infrastructure/database/UserActivityRepository.js';
import KafkaProducer from './infrastructure/kafka/KafkaProducer.js';
import KafkaConsumer from './infrastructure/kafka/KafkaConsumer.js';
import ActivityUseCases from './application/usecases/ActivityUseCases.js';
import EventProcessorService from './application/services/EventProcessorService.js';
import createActivityRoutes from './interfaces/routes/ActivityRoutes.js';

async function start() {
  try {
    console.log('Starting app...');
    
    const db = new MongoDBConnection();
    await db.connect();
    
    const repository = new UserActivityRepository();
    
    const kafkaProducer = new KafkaProducer();
    await kafkaProducer.connect();
    
    const kafkaConsumer = new KafkaConsumer();
    await kafkaConsumer.connect();
    
    const activityUseCases = new ActivityUseCases(repository, kafkaProducer);
    
    const eventProcessor = new EventProcessorService(kafkaConsumer, activityUseCases);
    await eventProcessor.start();
    
    const app = express();
    app.use(express.json());
    app.use('/api/v1', createActivityRoutes(activityUseCases));
    
    const port = process.env.PORT || 3000;
    const server = app.listen(port, function() {
      console.log('Server on port ' + port);
    });
    
    process.on('SIGINT', async function() {
      await kafkaProducer.disconnect();
      await kafkaConsumer.disconnect();
      await db.disconnect();
      server.close();
      process.exit(0);
    });
    
    console.log('App started');
  } catch (error) {
    console.log('Error:', error.message);
    process.exit(1);
  }
}

start();
