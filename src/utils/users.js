let users = [];

export const removeUser = (id) => {
  users = users.filter((aUser) => aUser.id !== id);
};

export const getCurrentUser = (id) => {
  return users.find((aUser) => aUser.id === id);
};


