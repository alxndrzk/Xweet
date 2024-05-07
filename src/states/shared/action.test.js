/**
 * shared Action Testing Scenario
 *
 * - should dispatch action correctly when data fetching success
 * - should dispatch action correctly when data fetching failed
 */

import { 
  describe, 
  it, 
  expect, 
  beforeEach, 
  afterEach, 
  vi,
} from 'vitest';

import { asyncPopulateUsersAndThreads } from './action';
import { fetchThreads } from '../threads/action';
import { fetchUsers } from '../users/action';
import api from '../../utils/api';

const fakeThreadsResponse = [
  {
    id: 1,
    title: 'Thread 1',
    body: 'Body 1',
    category: 'Category 1',
    createdAt: '2018-01-01T00:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThread thunk', () => {
  beforeEach(() => {
    api.getAllUsers = api.getAllUsers;
    api.getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllThreads = api.getAllThreads;
    api.getAllUsers = api.getAllUsers;

    // delete backup data
    delete api.getAllThreads;
    delete api.getAllUsers;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      fetchThreads(fakeThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      fetchUsers(fakeUsersResponse),
    );
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert if window is defined
    if (typeof window !== 'undefined') {
      window.alert = vi.fn();
    }

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    if (typeof window !== 'undefined') {
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    }
  });
});
