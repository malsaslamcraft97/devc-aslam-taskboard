import { TaskStatus } from '@/types/task';

export type NonTodoStatus = Exclude<TaskStatus, 'todo'>;

export const PRESET_ICONS = ['📝', '📚', '⚡', '🕐', '☕', '🎯', '🚀', '💡', '🔥', '✅', '🎉', '🧩'] as const;

export const TASK_CARD_BG: Record<TaskStatus, string> = {
  'in-progress': 'bg-task-in-progress',
  completed:     'bg-task-completed',
  'wont-do':     'bg-task-wont-do',
  todo:          'bg-task-todo',
};

export const STATUS_BUTTON_CONFIG: Record<NonTodoStatus, { buttonBg: string; icon: string; label: string }> = {
  'in-progress': { buttonBg: 'bg-btn-amber', icon: '/Time_atack_duotone.svg', label: 'In progress' },
  completed:     { buttonBg: 'bg-btn-green', icon: '/Done_round.svg',          label: 'Completed'   },
  'wont-do':     { buttonBg: 'bg-btn-red',   icon: '/close_ring_duotone.svg',  label: "Won't do"    },
};

export const STATUS_EDIT_OPTIONS: Array<{ value: TaskStatus; label: string; cardBg: string; activeBorder: string }> = [
  { value: 'todo',        label: 'To Do',       cardBg: 'bg-task-todo',        activeBorder: 'ring-2 ring-gray-400'  },
  { value: 'in-progress', label: 'In Progress',  cardBg: 'bg-task-in-progress', activeBorder: 'ring-2 ring-btn-amber' },
  { value: 'completed',   label: 'Completed',    cardBg: 'bg-task-completed',   activeBorder: 'ring-2 ring-btn-green' },
  { value: 'wont-do',     label: "Won't Do",     cardBg: 'bg-task-wont-do',     activeBorder: 'ring-2 ring-btn-red'   },
];

export function getTaskCardBg(status: TaskStatus): string {
  return TASK_CARD_BG[status];
}

export function isNonTodoStatus(status: TaskStatus): status is NonTodoStatus {
  return status !== 'todo';
}

export function isValidTaskTitle(title: string): boolean {
  return title.trim().length > 0;
}
