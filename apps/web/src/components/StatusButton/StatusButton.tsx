import { TaskStatus } from '@/types/task';

interface StatusButtonProps {
  status: Exclude<TaskStatus, 'todo'>;
  onClick?: () => void;
}

const STATUS_CONFIG = {
  'in-progress': { bg: 'bg-btn-amber', icon: '/Time_atack_duotone.svg', label: 'In progress' },
  completed:     { bg: 'bg-btn-green', icon: '/Done_round.svg',          label: 'Completed'   },
  'wont-do':     { bg: 'bg-btn-red',   icon: '/close_ring_duotone.svg',  label: "Won't do"    },
} satisfies Record<Exclude<TaskStatus, 'todo'>, { bg: string; icon: string; label: string }>;

export default function StatusButton({ status, onClick }: StatusButtonProps) {
  const { bg, icon, label } = STATUS_CONFIG[status];

  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`w-[52px] h-[52px] flex-shrink-0 rounded-xl flex items-center justify-center ${bg} hover:opacity-90 transition-opacity`}
    >
      <img src={icon} alt="" className="w-5 h-5" />
    </button>
  );
}
