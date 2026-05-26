import { create } from 'zustand';
import { Board, Task } from '@/types/task';
import * as api from '@/api/boardApi';

interface BoardStore {
  board: Board | null;
  loading: boolean;
  error: string | null;
  loadBoard: (id: string) => Promise<void>;
  updateBoardMeta: (data: { name?: string; description?: string }) => Promise<void>;
  addTask: () => Promise<void>;
  updateTask: (taskId: string, data: Partial<Pick<Task, 'title' | 'description' | 'icon' | 'status'>>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: null,
  loading: false,
  error: null,

  loadBoard: async (id) => {
    set({ loading: true, error: null });
    try {
      const board = await api.getBoard(id);
      set({ board, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  updateBoardMeta: async (data) => {
    const { board } = get();
    if (!board) return;
    const updated = await api.updateBoard(board.id, data);
    set({ board: updated });
  },

  addTask: async () => {
    const { board } = get();
    if (!board) return;
    const task = await api.addTask(board.id);
    set({ board: { ...board, tasks: [...board.tasks, task] } });
  },

  updateTask: async (taskId, data) => {
    const { board } = get();
    if (!board) return;
    const updated = await api.updateTask(taskId, data);
    set({
      board: {
        ...board,
        tasks: board.tasks.map((t) => (t.id === taskId ? updated : t)),
      },
    });
  },

  deleteTask: async (taskId) => {
    const { board } = get();
    if (!board) return;
    await api.deleteTask(taskId);
    set({
      board: {
        ...board,
        tasks: board.tasks.filter((t) => t.id !== taskId),
      },
    });
  },
}));
