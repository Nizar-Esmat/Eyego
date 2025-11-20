import 'dotenv/config';
import express from 'express';
import * as db from './infrastructure/database/MongoDBConnection.js';
import * as kafkaProducer from './infrastructure/kafka/KafkaProducer.js';
import * as kafkaConsumer from './infrastructure/kafka/KafkaConsumer.js';
import * as eventProcessor from './application/services/EventProcessorService.js';
import * as activityUseCases from './application/usecases/ActivityUseCases.js';
import activityRoutes from './interfaces/routes/activities.routes.js';

async function start() {
  try {
    console.log('Starting app...');
    
    await db.connect();
    await kafkaProducer.connect();
    await kafkaConsumer.connect();
    await eventProcessor.start();
    
    const app = express();
    app.use(express.json());
    app.locals.activityUseCases = activityUseCases;
    app.use('/api/v1', activityRoutes);
    
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
