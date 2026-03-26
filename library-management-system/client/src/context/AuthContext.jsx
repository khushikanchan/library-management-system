import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const defaultUsers = [
  {
    id: 1,
    name: "Admin",
    email: "admin@library.com",
    password: "123456",
    role: "Admin",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("library_users")) || [];
    if (storedUsers.length === 0) {
      localStorage.setItem("library_users", JSON.stringify(defaultUsers));
    }

    const storedUser = JSON.parse(localStorage.getItem("library_logged_in_user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("library_users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    localStorage.setItem("library_logged_in_user", JSON.stringify(foundUser));
    setUser(foundUser);

    return { success: true };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("library_users")) || [];
    const exists = users.find((u) => u.email === email);

    if (exists) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "Librarian",
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("library_users", JSON.stringify(updatedUsers));
    localStorage.setItem("library_logged_in_user", JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("library_logged_in_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}