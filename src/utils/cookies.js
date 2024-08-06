import Cookies from "js-cookie";

export const setUsersCookie = (users) => {
  Cookies.set("users", JSON.stringify(users));
};

export const getUsersCookie = () => {
  const users = Cookies.get("users");
  return users ? JSON.parse(users) : [];
};

export const validateCredentials = (email, password) => {
  const users = getUsersCookie();
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export const updateUserPassword = (email, newPassword) => {
  const users = getUsersCookie();
  const updatedUsers = users.map((user) =>
    user.email === email ? { ...user, password: newPassword } : user
  );
  Cookies.set("users", JSON.stringify(updatedUsers));
};

export const setCurrentUserEmail = (email) => {
  Cookies.set("currentEmail", email);
};

export const getCurrentUserEmail = () => {
  return Cookies.get("currentEmail");
};
