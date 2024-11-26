import React, { useEffect, useState } from "react";
import {
  fetchRoles,
  addRole,
  updateRole,
  deleteRole,
  fetchPermissions,
} from "../mock/apiR";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [editRole, setEditRole] = useState(null);

  useEffect(() => {
    fetchRoles().then(setRoles);
    fetchPermissions().then(setPermissions);
  }, []);

  const handleAddRole = () => {
    if (!newRole.name) return;

    addRole(newRole)
      .then(() => {
        setNewRole({ name: "", permissions: [] });
        fetchRoles().then(setRoles);
      })
      .catch((error) => console.error("Failed to add role:", error));
  };

  const handleEditRole = (role) => {
    setEditRole(role);
    setNewRole(role);
  };

  const handleUpdateRole = () => {
    if (!newRole.name) return;

    updateRole(editRole.id, newRole)
      .then(() => {
        setEditRole(null);
        setNewRole({ name: "", permissions: [] });
        fetchRoles().then(setRoles);
      })
      .catch((error) => console.error("Failed to update role:", error));
  };

  const handleDeleteRole = (id) => {
    deleteRole(id)
      .then(() => fetchRoles().then(setRoles))
      .catch((error) => console.error("Failed to delete role:", error));
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl p-8 bg-white shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Role Management</h2>

        {/* Add/Edit Role Form */}
        <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
          <input
            type="text"
            value={newRole.name}
            onChange={(e) =>
              setNewRole((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Role Name"
            className="flex-grow border border-gray-400 px-4 py-2 rounded-md text-white"
          />
          <select
            multiple
            value={newRole.permissions}
            onChange={(e) =>
              setNewRole((prev) => ({
                ...prev,
                permissions: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              }))
            }
            className="flex-grow border border-gray-400 px-4 py-2 rounded-md text-gray-400"
          >
            {permissions.map((perm) => (
              <option key={perm} value={perm}>
                {perm}
              </option>
            ))}
          </select>
          {editRole ? (
            <button
              onClick={handleUpdateRole}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Update Role
            </button>
          ) : (
            <button
              onClick={handleAddRole}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Role
            </button>
          )}
        </div>

        {/* Roles Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-left text-black">Role Name</th>
                <th className="border border-gray-300 px-6 py-3 text-left text-black">Permissions</th>
                <th className="border border-gray-300 px-6 py-3 text-left text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="border border-gray-300 px-6 py-3 text-black">{role.name}</td>
                  <td className="border border-gray-300 px-6 py-3 text-black">
                    {role.permissions.join(", ")}
                  </td>
                  <td className="border border-gray-300 px-6 py-3">
                    <button
                      onClick={() => handleEditRole(role)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
