import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { useBoardStore } from '@/store/boardStore';

const mockBoard = {
  id: 'test-board',
  name: 'My Task Board',
  description: 'Tasks to keep organised',
  tasks: [
    { id: '1', title: 'Task in Progress', status: 'in-progress', icon: '🕐', boardId: 'test-board' },
    { id: '2', title: 'Task Completed', status: 'completed', icon: '⚡', boardId: 'test-board' },
    { id: '3', title: "Task Won't Do", status: 'wont-do', icon: '☕', boardId: 'test-board' },
    { id: '4', title: 'Task To Do', status: 'todo', icon: '📚', description: 'Work on a Challenge on devChallenges.io, learn TypeScript.', boardId: 'test-board' },
  ],
};

vi.mock('@/api/boardApi', () => {
  const board = {
    id: 'test-board',
    name: 'My Task Board',
    description: 'Tasks to keep organised',
    tasks: [
      { id: '1', title: 'Task in Progress', status: 'in-progress', icon: '🕐', boardId: 'test-board' },
      { id: '2', title: 'Task Completed', status: 'completed', icon: '⚡', boardId: 'test-board' },
      { id: '3', title: "Task Won't Do", status: 'wont-do', icon: '☕', boardId: 'test-board' },
      { id: '4', title: 'Task To Do', status: 'todo', icon: '📚', description: 'Work on a Challenge on devChallenges.io, learn TypeScript.', boardId: 'test-board' },
    ],
  };
  return {
    getBoard: vi.fn().mockResolvedValue(board),
    addTask: vi.fn().mockResolvedValue({ id: '5', title: 'New Task', status: 'todo', icon: '📝', boardId: 'test-board' }),
    createBoard: vi.fn().mockResolvedValue({ ...board, id: 'new-board' }),
    updateBoard: vi.fn().mockResolvedValue(board),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
  };
});

function renderApp(initialPath = '/board/test-board') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App', () => {
  beforeEach(() => {
    useBoardStore.setState({ board: null, loading: false, error: null });
  });

  it('renders the board header', async () => {
    renderApp();
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /my task board/i })).toBeInTheDocument(),
    );
  });

  it('renders all initial tasks', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByText('Task in Progress')).toBeInTheDocument();
      expect(screen.getByText('Task Completed')).toBeInTheDocument();
      expect(screen.getByText("Task Won't Do")).toBeInTheDocument();
      expect(screen.getByText('Task To Do')).toBeInTheDocument();
    });
  });

  it('renders the Add new task card', async () => {
    renderApp();
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument(),
    );
  });

  it('adds a new task when Add new task is clicked', async () => {
    const user = userEvent.setup();
    renderApp();

    await waitFor(() => screen.getByRole('button', { name: /add new task/i }));
    const before = screen.getAllByRole('article').length;

    await user.click(screen.getByRole('button', { name: /add new task/i }));
    await waitFor(() =>
      expect(screen.getAllByRole('article').length).toBe(before + 1),
    );
  });
});
