import mongoose from 'mongoose';

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
}

async function disconnect() {
  await mongoose.connection.close();
}

export { connect, disconnect };
