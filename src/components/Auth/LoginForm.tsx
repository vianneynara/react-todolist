import React, {useState} from 'react';
import {todoApiService} from "../../api/TodoApiService.tsx";

export default function LoginForm() {
  const [formUsername, setFormUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setLoginMessage('');

    try {
      const response = await todoApiService.login(formUsername, password);

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', formUsername);
        setLoginMessage('Login successful! Redirecting...');
        // delay for 2 seconds before redirecting
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setLoginMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            value={password}
            autoComplete={"current-password"}
            onChange={event => setPassword(event.target.value)}
            required={true}
            className="flex-1"
          />
        </div>
        <div className="py-2 mt-auto flex flex-row justify-between items-center">
          <a target={"_self"} href={"/register"}>Register</a>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      <div className="flex flex-row justify-center">
        {loginMessage && (
          <div
            className={`mt-2 p-2 text-sm ${loginMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {loginMessage}
          </div>
        )}
      </div>
    </div>
  );
}