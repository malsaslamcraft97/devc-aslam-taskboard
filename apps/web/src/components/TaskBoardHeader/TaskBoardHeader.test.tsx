import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TaskBoardHeader from './TaskBoardHeader';
import { Board } from '@/types/task';

const mockBoard: Board = {
  id: '1',
  name: 'My Task Board',
  description: 'Tasks to keep organised',
  tasks: [],
};

const onSave = vi.fn().mockResolvedValue(undefined);

describe('TaskBoardHeader', () => {
  it('renders the board title', () => {
    render(<TaskBoardHeader board={mockBoard} onSave={onSave} />);
    expect(screen.getByRole('heading', { name: /my task board/i })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<TaskBoardHeader board={mockBoard} onSave={onSave} />);
    expect(screen.getByText(/tasks to keep organised/i)).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<TaskBoardHeader board={mockBoard} onSave={onSave} />);
    expect(screen.getByAltText(/my task board logo/i)).toBeInTheDocument();
  });

  it('renders the edit button', () => {
    render(<TaskBoardHeader board={mockBoard} onSave={onSave} />);
    expect(screen.getByRole('button', { name: /edit board title/i })).toBeInTheDocument();
  });
});
