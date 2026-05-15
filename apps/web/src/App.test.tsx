import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the task board heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /my task board/i })).toBeInTheDocument();
  });
});
