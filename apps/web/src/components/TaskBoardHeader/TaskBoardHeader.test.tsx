import { render, screen } from '@testing-library/react';
import TaskBoardHeader from './TaskBoardHeader';

describe('TaskBoardHeader', () => {
  it('renders the board title', () => {
    render(<TaskBoardHeader />);
    expect(screen.getByRole('heading', { name: /my task board/i })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<TaskBoardHeader />);
    expect(screen.getByText(/tasks to keep organised/i)).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<TaskBoardHeader />);
    expect(screen.getByAltText(/my task board logo/i)).toBeInTheDocument();
  });

  it('renders the edit button', () => {
    render(<TaskBoardHeader />);
    expect(screen.getByRole('button', { name: /edit board title/i })).toBeInTheDocument();
  });
});
