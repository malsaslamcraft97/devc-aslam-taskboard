import { Board, Task } from '@/types/task';

const API_BASE = '/api';

type JsonRequestInit = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

type BoardInput = {
  name?: string;
  description?: string;
};

type TaskInput = Partial<Pick<Task, 'title' | 'description' | 'icon' | 'status'>>;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const routeId = (id: string) => encodeURIComponent(id);

async function errorMessage(res: Response): Promise<string> {
  const fallback = res.statusText || `Request failed: ${res.status}`;
  const text = await res.text().catch(() => '');

  if (!text) return fallback;

  try {
    const body = JSON.parse(text) as { message?: unknown; error?: unknown };
    if (typeof body.message === 'string') return body.message;
    if (Array.isArray(body.message)) return body.message.join(', ');
    if (typeof body.error === 'string') return body.error;
  } catch {
    return text;
  }

  return text;
}

async function request<T>(path: string, init: JsonRequestInit = {}): Promise<T> {
  const { body, headers, ...requestInit } = init;
  const requestHeaders = new Headers(headers);
  const fetchInit: RequestInit = { ...requestInit };

  if (body !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  let hasHeaders = false;
  requestHeaders.forEach(() => {
    hasHeaders = true;
  });

  if (hasHeaders) {
    fetchInit.headers = requestHeaders;
  }

  if (body !== undefined) {
    fetchInit.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, fetchInit);

  if (!res.ok) {
    throw new ApiError(await errorMessage(res), res.status, res.statusText);
  }

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export const createBoard = (data: BoardInput = {}) =>
  request<Board>('/boards', { method: 'POST', body: data });

export const getBoard = (boardId: string) =>
  request<Board>(`/boards/${routeId(boardId)}`);

export const updateBoard = (boardId: string, data: BoardInput) =>
  request<Board>(`/boards/${routeId(boardId)}`, { method: 'PUT', body: data });

export const deleteBoard = (boardId: string) =>
  request<void>(`/boards/${routeId(boardId)}`, { method: 'DELETE' });

export const addTask = (boardId: string) =>
  request<Task>(`/boards/${routeId(boardId)}/tasks`, { method: 'POST', body: {} });

export const updateTask = (taskId: string, data: TaskInput) =>
  request<Task>(`/tasks/${routeId(taskId)}`, { method: 'PUT', body: data });

export const deleteTask = (taskId: string) =>
  request<void>(`/tasks/${routeId(taskId)}`, { method: 'DELETE' });
