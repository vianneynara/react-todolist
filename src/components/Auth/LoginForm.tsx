import React, {useEffect, useState} from 'react';
import {todoApiService} from "../../api/TodoApiService.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";

export default function LoginForm() {
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const {login} = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setLoginMessage('');

    try {
      const response = await todoApiService.login(formUsername, formPassword);
      console.log(response);

      if (response.status === 200) {
        setLoginMessage('Login successful! Redirecting...');
        login(formUsername, response.data.token);
      } else if (response.status === 404) {
        setLoginMessage('Invalid credentials.');
      } else {
        setLoginMessage('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setLoginMessage('An error from the server has occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="m-4 max-w-sm">
      <span className={"font-bold"}>Log into existing account</span>
      <form onSubmit={handleSubmit}>
        <div className="py-2 flex items-center">
          <label className="w-24">Username</label>
          <input
            type="text"
            value={formUsername}
            onChange={event => setFormUsername(event.target.value)}
            autoComplete={"username"}
            required={true}
            className="flex-1"
          />
        </div>
        <div className="py-2 flex items-center">
          <label className="w-24">Password</label>
          <input
            type="password"
            value={formPassword}
            autoComplete={"current-password"}
            onChange={event => setFormPassword(event.target.value)}
            required={true}
            className="flex-1"
          />
        </div>
        <div className="py-2 mt-auto flex flex-row justify-between items-center">
          <a target={"_self"} href={"/register"}>Register</a>
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </div>
      </form>
      <div className="flex flex-row justify-center">
        {loginMessage && (
          <div
            className={`p-2 text-sm ${loginMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {loginMessage}
          </div>
        )}
      </div>
    </div>
  );
}