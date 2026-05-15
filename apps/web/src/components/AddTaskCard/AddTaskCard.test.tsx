import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTaskCard from './AddTaskCard';

describe('AddTaskCard', () => {
  it('renders "Add new task" label', () => {
    render(<AddTaskCard onAddTask={() => {}} />);
    expect(screen.getByText(/add new task/i)).toBeInTheDocument();
  });

  it('renders the add button', () => {
    render(<AddTaskCard onAddTask={() => {}} />);
    expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument();
  });

  it('calls onAddTask when the button is clicked', async () => {
    const user = userEvent.setup();
    const handleAddTask = vi.fn();
    render(<AddTaskCard onAddTask={handleAddTask} />);

    await user.click(screen.getByRole('button', { name: /add new task/i }));
    expect(handleAddTask).toHaveBeenCalledOnce();
  });
});
