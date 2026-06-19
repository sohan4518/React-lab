import { useState } from "react";
import DOMPurify from "dompurify";
import "./index.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: DOMPurify.sanitize(
        e.target.value
      ),
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        .test(formData.email)
    ) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
        .test(formData.password)
    ) {
      newErrors.password =
        "Min 6 chars, 1 uppercase, 1 number, 1 special char";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmittedData(formData);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error-border" : ""}
          placeholder="Enter name"
        />

        <div className="error-message">
          {errors.name}
        </div>

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error-border" : ""}
          placeholder="Enter email"
        />

        <div className="error-message">
          {errors.email}
        </div>

        <label>Password</label>

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "error-border" : ""}
          placeholder="Enter password"
        />

        <div className="error-message">
          {errors.password}
        </div>

        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() =>
              setShowPassword(!showPassword)
            }
          />
          Show Password
        </label>

        <br />
        <br />

        <button type="submit">
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="result">
          <h3>Submitted Data</h3>

          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Password: {submittedData.password}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
