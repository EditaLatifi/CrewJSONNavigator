// LoginWrapper.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginWrapper = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle your login logic here
    localStorage.setItem('userLoggedIn', 'true');
    navigate('/departments');
  };

  return (
    <Login onLogin={handleLogin} />
  );
};

export default LoginWrapper;
