import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userType: "",
    
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    registerUser,
    defaultValues
  );

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>_
          Username:{" "}
          <input
            type="text"
            name="userName"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          User Type:{" "}
          <select
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
          >
            <option value="">Select User Type</option>
            <option value="Environmentalist">Environmentalist</option>
            <option value="Store Owner">Store Owner</option>
          </select>
        </label>
        

        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
