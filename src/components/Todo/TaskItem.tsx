import {useState, useEffect} from 'react';

interface TaskItemProps {
  taskId: number
  title: string;
  isCompleted: boolean;
  onDelete: () => void;
}

export default function TaskItem({title, isCompleted, onDelete}: TaskItemProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [taskTitle, setTaskTitle] = useState(title);

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  useEffect(() => {
    setTaskTitle(title);
  }, [title]);

  return (
    <div className="bg-green-100 flex items-center justify-between w-[500px] p-1">
      <div className="bg-blue-400 px-1">
        <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)}/>
      </div>
      <div className="bg-purple-400 ps-2 flex-grow">
        {taskTitle}
      </div>
      <div className="bg-red-400">
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}