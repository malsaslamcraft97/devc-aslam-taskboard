import { Board, Task } from '@/types/task';

const BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const createBoard = (data?: { name?: string; description?: string }) =>
  request<Board>('/boards', { method: 'POST', body: JSON.stringify(data ?? {}) });

export const getBoard = (boardId: string) =>
  request<Board>(`/boards/${boardId}`);

export const updateBoard = (boardId: string, data: { name?: string; description?: string }) =>
  request<Board>(`/boards/${boardId}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteBoard = (boardId: string) =>
  request<void>(`/boards/${boardId}`, { method: 'DELETE' });

export const addTask = (boardId: string) =>
  request<Task>(`/boards/${boardId}/tasks`, { method: 'POST', body: JSON.stringify({}) });

export const updateTask = (taskId: string, data: Partial<Pick<Task, 'title' | 'description' | 'icon' | 'status'>>) =>
  request<Task>(`/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteTask = (taskId: string) =>
  request<void>(`/tasks/${taskId}`, { method: 'DELETE' });
