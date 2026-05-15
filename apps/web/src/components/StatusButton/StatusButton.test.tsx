import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatusButton from './StatusButton';

describe('StatusButton', () => {
  it('renders with aria-label "In progress" for in-progress status', () => {
    render(<StatusButton status="in-progress" />);
    expect(screen.getByRole('button', { name: /in progress/i })).toBeInTheDocument();
  });

  it('renders with aria-label "Completed" for completed status', () => {
    render(<StatusButton status="completed" />);
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it("renders with aria-label \"Won't do\" for wont-do status", () => {
    render(<StatusButton status="wont-do" />);
    expect(screen.getByRole('button', { name: /won't do/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<StatusButton status="completed" onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: /completed/i }));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
