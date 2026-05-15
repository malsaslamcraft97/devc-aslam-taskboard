interface AddTaskCardProps {
  onAddTask: () => void;
}

export default function AddTaskCard({ onAddTask }: AddTaskCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-task-add">
      <button
        aria-label="Add new task"
        onClick={onAddTask}
        className="w-[52px] h-[52px] flex-shrink-0 bg-btn-amber rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <img src="/Add_round_duotone.svg" alt="" className="w-6 h-6" />
      </button>
      <p className="font-bold text-[15px] text-gray-900">Add new task</p>
    </div>
  );
}
