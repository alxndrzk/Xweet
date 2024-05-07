/**
 * @jest-environment jsdom
 */

/**
 * LeaderboardList Testing Scenario
 *
 * - should render the correct number of LeaderboardItem components
 */

import {
  describe,
  it,
  expect,
  afterEach,
} from 'vitest';
import {
  screen,
  render,
  cleanup,
} from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import LeaderboardList from './LeaderboardList';

expect.extend(matchers);

describe('LeaderboardList Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the correct number of LeaderboardItem components', () => {
    const leaderboards = [
      { id: '1', name: 'John Doe', score: 100 },
      { id: '2', name: 'Jane Doe', score: 90 },
      { id: '3', name: 'Bob Smith', score: 80 },
    ];

    render(
      <LeaderboardList leaderboards={leaderboards} />, 
      { wrapper: MemoryRouter },
    );

    const leaderboardItems = screen.getAllByTestId('leaderboard-item');
    expect(leaderboardItems).toHaveLength(leaderboards.length);
  });
});
