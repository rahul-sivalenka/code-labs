import { connectDB } from './connect-db';
export const addNewTask = async (task) => {
  let db = await connectDB();
  let collection = db.collection('tasks');
  await collection.insertOne(task);
};
