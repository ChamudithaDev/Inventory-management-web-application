
import React from 'react';
import { Navigate } from 'react-router-dom';
import AppBar from './component/navbar';

export default function ButtonAppBar({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AppBar />
    </div>
  );
}
