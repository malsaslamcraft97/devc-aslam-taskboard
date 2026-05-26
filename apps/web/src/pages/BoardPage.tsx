import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBoardStore } from '@/store/boardStore';
import TaskBoardHeader from '@/components/TaskBoardHeader/TaskBoardHeader';
import TaskCard from '@/components/TaskCard/TaskCard';
import AddTaskCard from '@/components/AddTaskCard/AddTaskCard';
import TaskEditPanel from '@/components/TaskEditPanel/TaskEditPanel';
import { Task } from '@/types/task';

export default function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const { board, loading, error, loadBoard, addTask, updateTask, deleteTask } = useBoardStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    if (boardId) loadBoard(boardId);
  }, [boardId, loadBoard]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center font-sans">
        <p className="text-gray-400 font-semibold">Loading…</p>
      </main>
    );
  }

  if (error || !board) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center font-sans">
        <p className="text-red-400 font-semibold">{error ?? 'Board not found'}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="w-full max-w-[480px] mx-auto">
        <TaskBoardHeader board={board} />
        <div className="mt-7 flex flex-col gap-3">
          {board.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditingTask}
              onStatusChange={(id, status) => updateTask(id, { status })}
            />
          ))}
          <AddTaskCard onAddTask={addTask} />
        </div>
      </div>

      {editingTask && (
        <TaskEditPanel
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={async (id, data) => {
            await updateTask(id, data);
            setEditingTask(null);
          }}
          onDelete={async (id) => {
            await deleteTask(id);
            setEditingTask(null);
          }}
        />
      )}
    </main>
  );
}
