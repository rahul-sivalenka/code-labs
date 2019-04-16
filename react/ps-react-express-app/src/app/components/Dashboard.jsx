import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';

export const Dashboard = ({groups}) => (
  <div>
    <h2>Dashboard</h2>
    {groups.map(group => (
      <ConnectedTaskList id={group.id} name={group.name} />
    ))}
  </div>
);

function mapStateToProps(state) {
  const { groups } = state;
  return {
    groups
  };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);