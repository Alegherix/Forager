import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const { user, logout } = useAuth();

  return (
    <>
      <main></main>
    </>
  );
};

export default Dashboard;
