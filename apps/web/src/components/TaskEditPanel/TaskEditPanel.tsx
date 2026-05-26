import { useEffect, useRef, useState } from 'react';
import { Task, TaskStatus } from '@/types/task';

interface Props {
  task: Task;
  onClose: () => void;
  onSave: (id: string, data: Partial<Pick<Task, 'title' | 'description' | 'icon' | 'status'>>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const PRESET_ICONS = ['📝', '📚', '⚡', '🕐', '☕', '🎯', '🚀', '💡', '🔥', '✅', '🎉', '🧩'];

const STATUS_OPTIONS: { value: TaskStatus; label: string; bg: string; active: string }[] = [
  { value: 'todo',        label: 'To Do',       bg: 'bg-task-todo',        active: 'ring-2 ring-gray-400' },
  { value: 'in-progress', label: 'In Progress',  bg: 'bg-task-in-progress', active: 'ring-2 ring-btn-amber' },
  { value: 'completed',   label: 'Completed',    bg: 'bg-task-completed',   active: 'ring-2 ring-btn-green' },
  { value: 'wont-do',     label: "Won't Do",     bg: 'bg-task-wont-do',     active: 'ring-2 ring-btn-red'   },
];

export default function TaskEditPanel({ task, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? '');
  const [icon, setIcon] = useState(task.icon);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [saving, setSaving] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(task.id, { title, description: description || undefined, icon, status });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    try {
      await onDelete(task.id);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl w-full max-w-[480px] p-6 flex flex-col gap-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900">Task details</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Icon picker */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Icon</label>
          <div className="flex flex-wrap gap-2">
            {PRESET_ICONS.map((e) => (
              <button
                key={e}
                onClick={() => setIcon(e)}
                className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                  icon === e ? 'bg-gray-900 shadow-md scale-110' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="task-title" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            Task name
          </label>
          <input
            id="task-title"
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="task-desc" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            Description
          </label>
          <textarea
            id="task-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Add a description…"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Status</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`px-3 py-1.5 rounded-xl text-sm font-bold ${opt.bg} ${status === opt.value ? opt.active : ''} transition-all`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={handleDelete}
            disabled={saving}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-btn-red border border-btn-red hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gray-900 hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
