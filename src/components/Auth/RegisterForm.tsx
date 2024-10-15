import React, {useState} from 'react';
import {todoApiService} from "../../api/TodoApiService.tsx";
import {useAuth} from "../../auth/AuthContext.tsx";

export default function RegisterForm() {
  const [formUsername, setFormUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');

  const {login} = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setRegisterMessage('');

    try {
      const response = await todoApiService.register(formUsername, password);

      if (response.status === 201) {
        setRegisterMessage('Register successful! Logging in...');
        setTimeout(() => {
          window.location.reload();
          login(formUsername, response.data.token);
        }, 2000);
      } else if (response.status === 409) {
        setRegisterMessage('Username already exists.');
      } else {
        setRegisterMessage('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setRegisterMessage('An error from the server has occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="m-4 max-w-sm">
      <span className={"font-bold"}>Register a new account</span>
      <form onSubmit={handleSubmit}>
        <div className="py-2 flex items-center">
          <label className="w-24">Username</label>
          <input
            type="text"
            value={formUsername}
            onChange={event => setFormUsername(event.target.value)}
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
          <a target={"_self"} href={"/login"}>Login</a>
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </div>
      </form>
      <div className="flex flex-row justify-center">
        {registerMessage && (
          <div
            className={`p-2 text-sm ${registerMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {registerMessage}
          </div>
        )}
      </div>
    </div>
  );
}