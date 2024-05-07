/**
 * leaderboards Action Testing Scenario
 * - should dispatch receiveLeaderboardsActionCreator with leaderboards from api.getLeaderboards
 * - should dispatch receiveLeaderboardsActionCreator with empty array when api.getLeaderboards failed
 */

import { 
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';

import api from '../../utils/api';
import { fetchLeaderboardsActionCreator } from './action';
import { asyncFetchLeaderboards } from './action';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncFetchLeaderboards thunk', () => {
  beforeEach(() => {
    api.getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api.getLeaderboards;
    delete api.getLeaderboards;
  });

  it('should dispatch fetchLeaderboardsActionCreator with leaderboards from api.getLeaderboards', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncFetchLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      fetchLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
  });

  it('should dispatch fetchLeaderboardsActionCreator with empty array when api.getLeaderboards failed', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert if window is defined
    if (typeof window !== 'undefined') {
      window.alert = vi.fn();
    }

    // action
    await asyncFetchLeaderboards()(dispatch);

    // assert
    if (typeof window !== 'undefined') {
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    }
  });
});
