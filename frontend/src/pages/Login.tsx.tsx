import React, { useState } from "react";
import "./Login.css";

// The Interface: This is the 'Contract' for your internal code.
// It ensures you don't accidentally try to use 'username' instead of 'email'.
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}
interface FormErrors {
  email?: string;
  password?: string;
}

const Logo = () => (
  <div className="logo-wrapper">
    <div className="logo-icon">~</div>
    <span className="logo-text">Windster</span>
  </div>
);

const Login: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  // 3. The Handler: A function that updates our state whenever a user types.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Keep the old values
      [name]: value, // Update only the one that changed (email or password)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (validate()) {
    console.log("Form is valid! Sending to backend...", formData);
    // This is where the fetch call will go!
  } else {
    console.log("Form has errors. Fix them first.");
  }
};

  const validate = (): boolean => {
  const newErrors: FormErrors = {};

  // Email check
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
  }

  // Password check
  if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);
  
  // If the newErrors object is empty, it returns 'true' (meaning the form is valid)
  return Object.keys(newErrors).length === 0;
};

  return (
    <div className="login-container">
      <Logo />
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Sign in to platform</h2>

        <div className="input-group">
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            name="email" // This MUST match the key in our interface
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errors.email && <span className="error-message">{errors.email}</span>}
        <div className="form-options">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
            />
            Remember me
          </label>
          <a href="#" className="lost-password">
            Lost Password?
          </a>
        </div>

        <button type="submit" className="login-button">
          Login to your account
        </button>

        <p className="footer-text">
          Not registered? <a href="#">Create account</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
