import { render, screen, act } from '@testing-library/react';
import Pre from './components/Pre';

describe('Pre loader', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('uses theme-aware terminal colors for the loading animation', () => {
    render(<Pre load={true} />);

    const firstLine = screen.getByText(/user@local:~\$ ssh noor@portfolio/i);
    expect(firstLine).toHaveStyle({ color: 'var(--terminal-green)' });

    for (let i = 0; i < 6; i += 1) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    const finalLine = screen.getByText(/welcome to noor's portfolio terminal!/i);
    expect(finalLine).toHaveStyle({ color: 'var(--terminal-purple)' });
  });
});
