import React from 'react';
import { TaskStatus } from '@/types/task';
import { NonTodoStatus, STATUS_BUTTON_CONFIG } from '@/domain/task';

interface StatusButtonProps {
  status: Exclude<TaskStatus, 'todo'>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function StatusButton({ status, onClick }: StatusButtonProps) {
  const { buttonBg, icon, label } = STATUS_BUTTON_CONFIG[status as NonTodoStatus];

  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`w-[52px] h-[52px] flex-shrink-0 rounded-xl flex items-center justify-center ${buttonBg} hover:opacity-90 transition-opacity`}
    >
      <img src={icon} alt="" className="w-5 h-5" />
    </button>
  );
}
