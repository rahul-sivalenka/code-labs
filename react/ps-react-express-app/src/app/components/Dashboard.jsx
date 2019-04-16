import React from 'react';
import { connect } from 'react-redux';

export const Dashboard = ({groups}) => (
  <div>
    <h2>Dashboard</h2>
    {groups.map(group => (
      <div>{group.name}</div>
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