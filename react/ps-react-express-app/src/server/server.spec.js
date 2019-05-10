import { addNewTask, updateTask } from "./server.util";

(async function runSpec() {
  const id = '12345';
  await addNewTask({
    name: 'My Test Task',
    id
  });

  await updateTask({
    id,
    name: 'My Updated Test Task',
    isComplete: true
  });
})();