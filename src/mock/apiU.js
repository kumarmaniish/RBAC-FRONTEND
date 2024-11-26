const mockUsers = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "Editor", status: "Inactive" },
  ];
  
  const mockRoles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  ];
  
  export const fetchUsers = () => Promise.resolve(mockUsers);
  
  export const fetchRoles = () => Promise.resolve(mockRoles);
  
  export const addUser = (user) => {
    mockUsers.push({ id: mockUsers.length + 1, ...user });
    return Promise.resolve(user);
  };
  
  export const updateUser = (id, updatedUser) => {
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...updatedUser };
      return Promise.resolve(mockUsers[index]);
    }
    return Promise.reject("User not found");
  };
  
  export const deleteUser = (id) => {
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject("User not found");
  };
  