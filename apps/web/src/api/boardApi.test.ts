import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, createBoard, deleteBoard, getBoard, updateTask } from './boardApi';

const board = {
  id: 'board-1',
  name: 'My Task Board',
  tasks: [],
};

describe('boardApi', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts JSON bodies with the correct API path', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify(board), { status: 200 }));

    await createBoard({ name: 'Launch list' });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/boards',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Launch list' }),
      }),
    );

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect((init.headers as Headers).get('Content-Type')).toBe('application/json');
  });

  it('encodes route parameters before sending requests', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify(board), { status: 200 }));

    await getBoard('team board/alpha');

    expect(fetchMock).toHaveBeenCalledWith('/api/boards/team%20board%2Falpha', {});
  });

  it('does not attach JSON headers to body-less delete requests', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));

    await expect(deleteBoard('board-1')).resolves.toBeUndefined();

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(init.headers).toBeUndefined();
    expect(init.body).toBeUndefined();
  });

  it('normalizes JSON API failures into ApiError instances', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ message: ['Title is required', 'Status is invalid'] }), {
        status: 400,
        statusText: 'Bad Request',
      }),
    );

    await expect(updateTask('task-1', { title: '' })).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Title is required, Status is invalid',
      status: 400,
      statusText: 'Bad Request',
    } satisfies Partial<ApiError>);
  });
});
