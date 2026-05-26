import { useState, useRef, useEffect } from 'react';
import { Board } from '@/types/task';
import { useBoardStore } from '@/store/boardStore';

interface Props {
  board: Board;
}

export default function TaskBoardHeader({ board }: Props) {
  const { updateBoardMeta } = useBoardStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(board.name);
  const [description, setDescription] = useState(board.description ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(board.name);
    setDescription(board.description ?? '');
  }, [board.name, board.description]);

  function startEdit() {
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  }

  async function commitEdit() {
    setEditing(false);
    const trimmed = name.trim();
    if (!trimmed) {
      setName(board.name);
      return;
    }
    await updateBoardMeta({ name: trimmed, description: description.trim() || undefined });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') {
      setEditing(false);
      setName(board.name);
      setDescription(board.description ?? '');
    }
  }

  return (
    <header>
      <div className="flex items-center gap-2">
        <img src="/Logo.svg" alt="My Task Board logo" className="w-10 h-10 flex-shrink-0" />
        {editing ? (
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-gray-600"
            aria-label="Board name"
          />
        ) : (
          <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight">
            {board.name}
          </h1>
        )}
        <button
          aria-label="Edit board title"
          onClick={editing ? commitEdit : startEdit}
          className="ml-0.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <img src="/Edit_duotone.svg" alt="" className="w-5 h-5" />
        </button>
      </div>

      {editing ? (
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          placeholder="Board description (optional)"
          className="mt-1.5 w-full text-sm text-gray-400 font-semibold bg-transparent border-b border-gray-200 focus:outline-none focus:border-gray-400 placeholder:text-gray-300"
          aria-label="Board description"
        />
      ) : (
        <p className="mt-1.5 text-sm text-gray-400 font-semibold">
          {board.description || 'Tasks to keep organised'}
        </p>
      )}
    </header>
  );
}
