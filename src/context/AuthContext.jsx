import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userObject) => {
    setUser(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");

    setTimeout(() => {
      if (!localStorage.getItem("user")) {
        window.location.href = "/signin";
      } else {
        localStorage.removeItem("user");
      }
    }, 50);
  };

  const isAuthenticated = JSON.parse(localStorage.getItem("user"));

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
