import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
import * as sagas from './sagas.mock';
import * as mutations from './mutations';

export const store = createStore(
  combineReducers({
    tasks(tasks = defaultState.tasks, {type, taskId, groupId, ownerId}) {
      switch(type) {
        case mutations.CREATE_TASK:
          return [...tasks, {
            id: taskId,
            name: 'New Task',
            group: groupId,
            owner: ownerId,
            isComplete: false
          }]
      }
      return tasks;
    },
    comments(comments = defaultState.comments, action) {
      return comments;
    },
    groups(groups = defaultState.groups, action) {
      return groups;
    },
    users(users = defaultState.users, action) {
      return users;
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}