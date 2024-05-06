import React, { useState } from 'react';
import './form.css';

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const Form: React.FC = () => {
  const [user, setUser] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };

      if (name === 'email') {
        const atIndex = value.indexOf('@');
        if (atIndex > 0) {
          updatedUser.username = value.substring(0, atIndex);
          setInvalidEmail(false);
        } else {
          setInvalidEmail(true);
        }
      }
      if (name === 'password' || name === 'confirmPassword') {
        setPasswordsMatch(updatedUser.password === updatedUser.confirmPassword);
      }

      return updatedUser;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignUp(true);
    console.log(user);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>REGISTRATION</h2>

      <input
        type="email"
        value={user.email}
        name="email"
        onChange={handleChange}
        placeholder="email"
      />
      {invalidEmail && <p style={{ color: 'red' }}>Zadejte platný email.</p>}
      <input
        type="text"
        value={user.username}
        name="username"
        onChange={handleChange}
        placeholder="username"
      />
      <input
        type="password"
        value={user.password}
        name="password"
        onChange={handleChange}
        placeholder="password"
      />
      <input
        type="password"
        value={user.confirmPassword}
        name="confirmPassword"
        onChange={handleChange}
        placeholder="confirm password"
      />
      {!passwordsMatch && <p style={{ color: 'red' }}>hesla se neshodují</p>}
      <button type="submit">Register</button>
      {signUp && <p> 🌸 Registrace úspěšná! 🦄 </p>}
    </form>
  );
};
