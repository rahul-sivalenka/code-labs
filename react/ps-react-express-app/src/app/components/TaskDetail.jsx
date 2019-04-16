import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const TaskDetail = ({
  id,
  comments,
  groups,
  task,
  isComplete
}) => (
  <div>
    <div>
      <input value={task.name} />
    </div>

    <div>
      <button>{isComplete ? `Reopen` : `Complete`} Task</button>
    </div>

    <div>
      <select>
        {groups.map(group => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </select>
    </div>

    <div>
      <Link to="/dashboard">
        <button>Done</button>
      </Link>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task => task.id === id);
  let comments = state.comments.find(comment => comment.taskId === id);
  return {
    id,
    comments,
    task,
    groups: state.groups,
    isComplete: task.isComplete
  };
};

export const ConnectedTaskDetail = connect(mapStateToProps)(TaskDetail);
