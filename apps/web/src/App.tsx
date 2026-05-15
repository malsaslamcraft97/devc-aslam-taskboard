import { useState } from 'react';
import TaskBoardHeader from '@/components/TaskBoardHeader/TaskBoardHeader';
import TaskCard from '@/components/TaskCard/TaskCard';
import AddTaskCard from '@/components/AddTaskCard/AddTaskCard';
import { initialTasks } from '@/data/initial-tasks';
import { Task } from '@/types/task';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleAddTask() {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: 'New Task',
      status: 'todo',
      icon: '📝',
    };
    setTasks((prev) => [...prev, newTask]);
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="w-full max-w-[480px] mx-auto">
        <TaskBoardHeader />
        <div className="mt-7 flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          <AddTaskCard onAddTask={handleAddTask} />
        </div>
      </div>
    </main>
  );
}
