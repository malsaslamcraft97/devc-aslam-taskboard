import { Task } from '@/types/task';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Task in Progress',
    status: 'in-progress',
    icon: '🕐',
  },
  {
    id: '2',
    title: 'Task Completed',
    status: 'completed',
    icon: '⚡',
  },
  {
    id: '3',
    title: "Task Won't Do",
    status: 'wont-do',
    icon: '☕',
  },
  {
    id: '4',
    title: 'Task To Do',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
    status: 'todo',
    icon: '📚',
  },
];
