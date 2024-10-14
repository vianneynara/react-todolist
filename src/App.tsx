import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from "./components/Errors/NotFoundPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import LoginForm from "./components/Auth/LoginForm.tsx";
import RegisterForm from "./components/Auth/RegisterForm.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.tsx";

const App: React.FC = () => {
  // username state
  const [username, setUsername] = React.useState(() => {
    return localStorage.getItem('username') || '';
  });

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <header className="w-full bg-purple-500 flex flex-row justify-between">
          <span className="text-white text-2xl font-bold p-4">Todo App</span>
          <span className="text-white text-2xl font-bold p-4">225314091</span>
        </header>
        <main className="flex-grow flex flex-col items-center ">
          <Router>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute requireAuth={false}>
                  <LoginForm />
                </ProtectedRoute>
              }/>
              <Route path="/login" element={
                <ProtectedRoute requireAuth={false}>
                  <LoginForm />
                </ProtectedRoute>
              }/>
              <Route path="/register" element={
                <ProtectedRoute requireAuth={false}>
                  <RegisterForm setUsername={setUsername}/>
                </ProtectedRoute>
              }/>
              <Route path="/dashboard" element={
                <ProtectedRoute requireAuth={true}>
                  <Dashboard username={username}/>
                </ProtectedRoute>
              }/>
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </Router>
        </main>
        <footer className="w-full bg-purple-500 text-white py-4">
          <div className="text-center">
            <span className="text-green-400 font-bold">http://localhost:5173</span>
            <span> (front-end) connected to (back-end) </span>
            <span className="text-green-400 font-bold">http://localhost:8081</span>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;