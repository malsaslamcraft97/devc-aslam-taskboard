import { Task, TaskStatus } from '@/types/task';
import StatusButton from '@/components/StatusButton/StatusButton';

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, status: TaskStatus) => void;
}

const CARD_BG: Record<TaskStatus, string> = {
  'in-progress': 'bg-task-in-progress',
  completed:     'bg-task-completed',
  'wont-do':     'bg-task-wont-do',
  todo:          'bg-task-todo',
};

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  return (
    <article
      aria-label={task.title}
      className={`flex items-center gap-3 p-3 rounded-2xl ${CARD_BG[task.status]}`}
    >
      {/* Icon */}
      <div
        aria-hidden
        className="w-[52px] h-[52px] flex-shrink-0 bg-white rounded-xl flex items-center justify-center text-2xl select-none shadow-sm"
      >
        {task.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[15px] text-gray-900 leading-snug">{task.title}</p>
        {task.description && (
          <p
            data-testid="task-description"
            className="text-[13px] text-gray-500 mt-0.5 leading-snug"
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Status button */}
      {task.status !== 'todo' && (
        <StatusButton
          status={task.status}
          onClick={() => onStatusChange?.(task.id, task.status)}
        />
      )}
    </article>
  );
}
