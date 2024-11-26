// Mock Data
let mockRoles = [
    {
      id: 1,
      name: "Admin",
      permissions: ["Read", "Write", "Delete"],
    },
    {
      id: 2,
      name: "Editor",
      permissions: ["Read", "Write"],
    },
    {
      id: 3,
      name: "Viewer",
      permissions: ["Read"],
    },
  ];
  
  let mockPermissions = ["Read", "Write", "Delete", "Manage Users", "Manage Roles"];
  
  // Mock Role API Functions
  
  /**
   * Fetch all roles.
   * @returns {Promise<Array>} List of roles.
   */
  export const fetchRoles = () => Promise.resolve(mockRoles);
  
  /**
   * Fetch a single role by ID.
   * @param {number} id Role ID.
   * @returns {Promise<Object>} Role object.
   */
  export const fetchRoleById = (id) =>
    Promise.resolve(mockRoles.find((role) => role.id === id));
  
  /**
   * Add a new role.
   * @param {Object} role New role object.
   * @returns {Promise<Object>} Newly created role.
   */
  export const addRole = (role) => {
    const newRole = { id: mockRoles.length + 1, ...role };
    mockRoles.push(newRole);
    return Promise.resolve(newRole);
  };
  
  /**
   * Update an existing role.
   * @param {number} id Role ID.
   * @param {Object} updatedRole Updated role object.
   * @returns {Promise<Object>} Updated role.
   */
  export const updateRole = (id, updatedRole) => {
    const index = mockRoles.findIndex((role) => role.id === id);
    if (index !== -1) {
      mockRoles[index] = { ...mockRoles[index], ...updatedRole };
      return Promise.resolve(mockRoles[index]);
    }
    return Promise.reject(new Error("Role not found"));
  };
  
  /**
   * Delete a role by ID.
   * @param {number} id Role ID.
   * @returns {Promise<void>}
   */
  export const deleteRole = (id) => {
    mockRoles = mockRoles.filter((role) => role.id !== id);
    return Promise.resolve();
  };
  
  // Mock Permission API Functions
  
  /**
   * Fetch all permissions.
   * @returns {Promise<Array>} List of permissions.
   */
  export const fetchPermissions = () => Promise.resolve(mockPermissions);
  
  /**
   * Add a new permission (optional for custom use).
   * @param {string} permission New permission name.
   * @returns {Promise<string>} Added permission.
   */
  export const addPermission = (permission) => {
    if (!mockPermissions.includes(permission)) {
      mockPermissions.push(permission);
      return Promise.resolve(permission);
    }
    return Promise.reject(new Error("Permission already exists"));
  };
  
  /**
   * Assign permissions to a role.
   * @param {number} roleId Role ID.
   * @param {Array<string>} permissions Permissions to assign.
   * @returns {Promise<Object>} Updated role.
   */
  export const assignPermissionsToRole = (roleId, permissions) => {
    const role = mockRoles.find((role) => role.id === roleId);
    if (role) {
      role.permissions = permissions;
      return Promise.resolve(role);
    }
    return Promise.reject(new Error("Role not found"));
  };
  