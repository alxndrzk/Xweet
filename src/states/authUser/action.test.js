import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';
import api from '../../utils/api';
import {
  setUserActionCreator, 
  unsetUserActionCreator, 
  asyncSetUser, 
  asyncUnsetUser, 
} from './action';
import { setErrorActionCreator } from './action'; 

const fakeAuthUser = {
  id: 'users-1',
  name: 'John Doe',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetUser thunk', async () => {
  beforeEach(() => {
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn();
  });

  afterEach(() => {
    api.login = api.login;
    api.getOwnProfile = api.getOwnProfile;

    // delete backup data
    delete api.login;
    delete api.putAccessToken;
    delete api.getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve({ token: '12345' });
    api.putAccessToken = () => {};
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetUser({ email: 'test@test.com', password: 'password' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setUserActionCreator(fakeAuthUser));
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.putAccessToken.mockRejectedValue(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    try {
      await asyncSetUser({ email: 'test@test.com', password: 'password' })(dispatch);
    } catch (error) {
      // assert
      expect(dispatch).toHaveBeenCalledWith(setErrorActionCreator(fakeErrorResponse.message));
    }
  });
});

describe('asyncUnsetUser thunk', async () => {
  beforeEach(() => {
    api.putAccessToken = vi.fn(); // Add this line
  });

  it('should dispatch action correctly', async () => {
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncUnsetUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetUserActionCreator());
  });
});
