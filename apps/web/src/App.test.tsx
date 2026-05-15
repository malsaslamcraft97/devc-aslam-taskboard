import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the board header', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /my task board/i })).toBeInTheDocument();
  });

  it('renders all initial tasks', () => {
    render(<App />);
    expect(screen.getByText('Task in Progress')).toBeInTheDocument();
    expect(screen.getByText('Task Completed')).toBeInTheDocument();
    expect(screen.getByText("Task Won't Do")).toBeInTheDocument();
    expect(screen.getByText('Task To Do')).toBeInTheDocument();
  });

  it('renders the Add new task card', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument();
  });

  it('adds a new task when Add new task is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const before = screen.getAllByRole('article').length;
    await user.click(screen.getByRole('button', { name: /add new task/i }));
    expect(screen.getAllByRole('article').length).toBe(before + 1);
  });
});
