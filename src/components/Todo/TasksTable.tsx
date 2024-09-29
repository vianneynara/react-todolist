import {useState, useEffect} from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

export default function TasksTable() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // useEffect(() => {
  //   fetch('https://localhost:8080/todos')
  //     .then(response => response.json())
  //     .then(json => {
  //       // Using the API returned format
  //       const formattedTasks = json.data.map((task: Task) => ({
  //         id: task.id,
  //         title: task.title,
  //         isCompleted: task.isCompleted
  //       }));
  //       setTasks(formattedTasks);
  //     })
  //     .catch(error => console.error('Error fetching tasks:', error));
  // }, []);

  // temporary factory for tasks until we have a backend
  useEffect(() => {
    const tempTasks = [
      {id: 1, title: 'Task 1', isCompleted: false},
      {id: 2, title: 'Task 2', isCompleted: true},
      {id: 3, title: 'Task 3', isCompleted: false}
    ];
    setTasks(tempTasks);
  }, []);

  const handleDelete = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className={`m-4`}>
      <table>
        <thead>
        <tr>
          <th>Tasks</th>
        </tr>
        </thead>
        <tbody>
        {tasks.map(task => (
          <div className={`py-2`}>
            <TaskItem
              key={task.id}
              taskId={task.id}
              title={task.title}
              isCompleted={task.isCompleted}
              onDelete={() => handleDelete(task.id)}
            />
          </div>
        ))}
        </tbody>
      </table>

    </div>
  );
}