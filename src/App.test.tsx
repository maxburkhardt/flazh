import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello message', () => {
  render(<App />);
  const helloElement = screen.getByText(/你好/i);
  expect(helloElement).toBeInTheDocument();
});
