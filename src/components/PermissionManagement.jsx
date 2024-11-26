import React, { useEffect, useState } from "react";
import {
  fetchPermissions,
  addPermission,
  updatePermission,
  deletePermission,
} from "../mock/apiP";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState({ name: "" });
  const [editPermission, setEditPermission] = useState(null);

  useEffect(() => {
    fetchPermissions().then(setPermissions);
  }, []);

  const handleAddPermission = () => {
    if (!newPermission.name) return;

    addPermission(newPermission)
      .then(() => {
        setNewPermission({ name: "" });
        fetchPermissions().then(setPermissions);
      })
      .catch((error) => console.error("Failed to add permission:", error));
  };

  const handleEditPermission = (permission) => {
    setEditPermission(permission);
    setNewPermission(permission);
  };

  const handleUpdatePermission = () => {
    if (!newPermission.name) return;

    updatePermission(editPermission.id, newPermission)
      .then(() => {
        setEditPermission(null);
        setNewPermission({ name: "" });
        fetchPermissions().then(setPermissions);
        })
      .catch((error) => console.error("Failed to update permission:", error));
    };

    const handleDeletePermission = (id) => {
    deletePermission(id)
      .then(() => fetchPermissions().then(setPermissions))
      .catch((error) => console.error("Failed to delete permission:", error));
    };
    
    return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Permission Management</h2>

        {/* Add/Edit Permission Form */}
        <div className="flex flex-col md:flex-row items-center mb-6 gap-4 justify-center">
          <input
            type="text"
            value={newPermission.name}
            onChange={(e) =>
              setNewPermission((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Permission Name"
            className="flex-grow border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            {editPermission ? (
            <button
              onClick={handleUpdatePermission}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Update Permission
            </button>
            ) : (
            <button
              onClick={handleAddPermission}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
            Add Permission
            </button>
            )}
        </div>

        {/* Permissions Table */}
        <div className="overflow-x-auto mt-6">
          {permissions.length === 0 ? (
            <div className="text-center text-black font-semibold mb-4">
              No permissions available. Please add a new permission.
            </div>
            ) : (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">Permission Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">Actions</th>
                </tr>
                </thead>
                <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.id}>
                    <td className="border border-gray-300 px-4 py-2 text-black">{perm.name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEditPermission(perm)}
                        className="px-4 py-1 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePermission(perm.id)}
                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Delete
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

export default PermissionManagement;
