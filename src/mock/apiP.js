let mockPermissions = [
    { id: 1, name: "Read" },
    { id: 2, name: "Write" },
    { id: 3, name: "Delete" },
  ];
  
  // Fetch Permissions - Get all permissions
  export const fetchPermissions = () => {
    return Promise.resolve(mockPermissions);
  };
  
  // Add Permission - Add a new permission to the list
  export const addPermission = (permission) => {
    const newPermission = { id: mockPermissions.length + 1, ...permission };
    mockPermissions.push(newPermission);
    return Promise.resolve(newPermission);
  };
  
  // Update Permission - Update an existing permission by id
  export const updatePermission = (id, updatedPermission) => {
    const index = mockPermissions.findIndex((perm) => perm.id === id);
    if (index !== -1) {
      mockPermissions[index] = { ...mockPermissions[index], ...updatedPermission };
      return Promise.resolve(mockPermissions[index]);
    }
    return Promise.reject("Permission not found");
  };
  
  // Delete Permission - Delete a permission by id
  export const deletePermission = (id) => {
    const index = mockPermissions.findIndex((perm) => perm.id === id);
    if (index !== -1) {
      mockPermissions.splice(index, 1);
      return Promise.resolve("Permission deleted successfully");
    }
    return Promise.reject("Permission not found");
  };
  