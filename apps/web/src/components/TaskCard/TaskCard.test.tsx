import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from './TaskCard';
import { Task } from '@/types/task';

const baseTask: Task = {
  id: '1',
  title: 'Test Task',
  status: 'todo',
  icon: '📚',
};

describe('TaskCard', () => {
  it('renders the task title', () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders the task icon', () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.getByText('📚')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<TaskCard task={{ ...baseTask, description: 'Some description' }} />);
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.queryByTestId('task-description')).not.toBeInTheDocument();
  });

  it('does not render status button for todo tasks', () => {
    render(<TaskCard task={baseTask} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders status button for in-progress tasks', () => {
    render(<TaskCard task={{ ...baseTask, status: 'in-progress' }} />);
    expect(screen.getByRole('button', { name: /in progress/i })).toBeInTheDocument();
  });

  it('renders status button for completed tasks', () => {
    render(<TaskCard task={{ ...baseTask, status: 'completed' }} />);
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it('renders status button for wont-do tasks', () => {
    render(<TaskCard task={{ ...baseTask, status: 'wont-do' }} />);
    expect(screen.getByRole('button', { name: /won't do/i })).toBeInTheDocument();
  });

  it('calls onStatusChange with task id and status when status button clicked', async () => {
    const user = userEvent.setup();
    const handleStatusChange = vi.fn();
    render(
      <TaskCard
        task={{ ...baseTask, status: 'completed' }}
        onStatusChange={handleStatusChange}
      />,
    );
    await user.click(screen.getByRole('button', { name: /completed/i }));
    expect(handleStatusChange).toHaveBeenCalledWith('1', 'completed');
  });

  it('applies the correct background class for each status', () => {
    const statuses = ['in-progress', 'completed', 'wont-do', 'todo'] as const;
    const expectedClasses = [
      'bg-task-in-progress',
      'bg-task-completed',
      'bg-task-wont-do',
      'bg-task-todo',
    ];

    statuses.forEach((status, i) => {
      const { unmount } = render(<TaskCard task={{ ...baseTask, status }} />);
      const card = screen.getByRole('article');
      expect(card).toHaveClass(expectedClasses[i]);
      unmount();
    });
  });
});
