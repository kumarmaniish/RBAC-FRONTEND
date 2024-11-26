import React from 'react';
import UserManagement from '../components/UserManagement';
import RoleManagement from '../components/RoleManagement';
import PermissionManagement from '../components/PermissionManagement';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6 ml-20 items-center justify-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6">
        <UserManagement/>
        <RoleManagement />
        <PermissionManagement />
      </div>
    </div>
  );
};

export default Dashboard;
