/**
 * isPreload Action Testing Scenario
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
import api from '../../utils/api';
import { setIsPreload, asyncPreloadProcess } from './action';

const fakeAuthUser = {
  id: 'users-1',
  name: 'John Doe',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPreloadProcess thunk', async () => {
  beforeEach(() => {
    api.getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api.getOwnProfile;

    // delete backup data
    delete api.getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setIsPreload(false));
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setIsPreload(false));
  });
});
