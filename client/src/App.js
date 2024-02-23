import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { NavBar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import "materialize-css";

function App() {
  const { token, login, logout, userId, ready, checkTokenExpiration } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            checkTokenExpiration(); // Вызываем функцию проверки срока действия токена при каждом рендере компонента
        }
    }, [isAuthenticated, checkTokenExpiration]);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
