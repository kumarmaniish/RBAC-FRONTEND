import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Manish", email: "mmaanniisshh77@gmail.com", isActive: true },
    { id: 2, name: "Anurag", email: "anurag45@gamil.com", isActive: false },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", isActive: true });
  const [editUser, setEditUser] = useState(null);

  // Add new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    const newUserData = { id: users.length + 1, ...newUser };
    setUsers((prevUsers) => [...prevUsers, newUserData]);
    setNewUser({ name: "", email: "", isActive: true });
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditUser(user);
    setNewUser(user);
  };

  // Update user
  const handleUpdateUser = () => {
    if (!newUser.name || !newUser.email) return;

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editUser.id ? { ...user, name: newUser.name, email: newUser.email, isActive: newUser.isActive } : user
      )
    );
    setEditUser(null);
    setNewUser({ name: "", email: "", isActive: true });
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Toggle user active/inactive status
  const toggleUserStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center ">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">User Management</h2>

        {/* Add/Edit User Form */}
        <div className="flex flex-col md:flex-row items-center mb-6 gap-4 justify-center">
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="User Name"
            className="flex-grow border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="User Email"
            className="flex-grow border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <div className="flex items-center">
            <label className="mr-2 text-black">Active</label>
            <input
              type="checkbox"
              checked={newUser.isActive}
              onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
              className="h-5 w-5"
            />
          </div>
          {editUser ? (
            <button
              onClick={handleUpdateUser}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
            Update User
            </button>
            ) : (
            <button
              onClick={handleAddUser}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
            Add User
            </button>
          )}
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto mt-6">
          {users.length === 0 ? (
            <div className="text-center text-black font-semibold mb-4">
              No users available. Please add a new user.
            </div>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">User Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border border-gray-300 px-4 py-2 text-black">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      <span
                        className={`px-4 py-1 rounded-full ${
                          user.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="px-4 py-1 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-600 transition"
                      >
                      Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                      Delete
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className="px-4 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition ml-2"
                      >
                      Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
