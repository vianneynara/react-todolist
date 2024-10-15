import { useEffect, useState } from "react";
import { todoApiService } from "../../api/TodoApiService";
import { Task } from "../../model/TaskModel";
import { useAuth } from "../../auth/AuthContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { username, token, logout } = useAuth();

  useEffect(() => {
    document.title = "Dashboard";
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    try {
      const response = await todoApiService.getUserTasks(token, username);
      setTasks(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    const title = (document.getElementById('formTitle') as HTMLInputElement).value;
    if (title === '') {
      console.error("Title is required");
      return;
    }

    const deadlineField = document.getElementById('formDeadline') as HTMLInputElement;
    const deadline = new Date(deadlineField.value || Date.now());

    try {
      const response = await todoApiService.createTask(token, username, title, deadline);
      if (response.status === 201) {
        await refreshTasks();
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (taskId: number) => {
    try {
      const response = await todoApiService.deleteTask(token, username, taskId);
      if (response.status === 204) {
        setTasks(tasks.filter(task => task.taskId !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCompletion = async (taskId: number) => {
    try {
      const response = await todoApiService.toggleCompleteTask(token, username, taskId);
      if (response.status === 204) {
        setTasks(tasks.map(task => 
          task.taskId === taskId 
            ? { ...task, isCompleted: !task.isCompleted } 
            : task
        ));
      } else {
        console.error("Task not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    setTasks([]);
    logout();
    window.location.reload();
  }

  return (
    <div className="w-[720px] mb-4">
      <div className="flex flex-row justify-between mt-1">
        <div className="flex flex-row">
          <div>
            Welcome, <span className="font-bold">{username}</span>!
          </div>
          <a className="ps-2 cursor-pointer" onClick={handleLogout}>
            Logout
          </a>
        </div>
        <a className="cursor-pointer" onClick={refreshTasks}>Refresh Tasks</a>
      </div>

      <h2 className="font-bold text-2xl">My tasks</h2>

      <div className="flex flex-row justify-between my-4">
        <input type="text" id="formTitle" placeholder="Task title" className="rounded-md px-2 flex-1"/>
        <input type="date" id="formDeadline" className="rounded-md mx-2 px-2 w-[130px]"/>
        <button onClick={handleCreate} className="hover:bg-purple-400 hover:text-black transition duration-300 ease-in-out">Create</button>
      </div>

      <div>
        {tasks.map((task, i) => (
          <div key={task.taskId} className="flex flex-col justify-center rounded-md bg-purple-500 my-2 py-1">
            <div className="flex flex-row justify-between items-center">
              <div className="bg-purple-600 rounded-md mx-1 py-1 px-2 font-bold">{i + 1}</div>
              <div className="bg-purple-600 rounded-md mx-1 py-1 px-2 font-bold flex-1">{task.title}</div>
              <div className="bg-purple-600 rounded-md mx-1 py-1 ps-2 pe-2 font-bold w-[100px]">
                {new Date(task.deadline).toLocaleDateString()}
              </div>
              <button 
                onClick={() => handleToggleCompletion(task.taskId)}
                className={`rounded-md mx-1 py-1 px-2 font-bold hover:bg-orange-500 transition duration-300 ease-in-out w-[80px] ${
                  task.isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                }`}
              >
                {task.isCompleted ? 'Done' : 'Pending'}
              </button>
              <button className="mx-1 bg-red-500 font-bold hover:bg-red-700 transition duration-300 ease-in-out" onClick={() => handleDelete(task.taskId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}