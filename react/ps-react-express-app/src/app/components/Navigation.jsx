import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Navigation = () => (
  <div>
    <Link to="/dashboard"><h1>My Application</h1></Link>
  </div>
);

const mapStateToProps = state => state;

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);