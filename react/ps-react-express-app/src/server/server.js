import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addNewTask } from './server.util';

let port = 7777;
let app = express();

app.listen(port, console.log('Server listening on port', port));
  
app.use(
  cors(),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
);

app.post('/task/new', async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});