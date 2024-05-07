import { 
  describe,
  it,
  expect,
} from 'vitest';
import { showLoadingSkeleton, hideLoadingSkeleton, ActionType } from './action';

describe('showLoadingSkeleton action creator', () => {
  it('should create an action to show loading skeleton', () => {
    const expectedAction = {
      type: ActionType.SHOW_LOADING,
      payload: {
        isLoading: true,
      },
    };
    expect(showLoadingSkeleton()).toEqual(expectedAction);
  });
});

describe('hideLoadingSkeleton action creator', () => {
  it('should create an action to hide loading skeleton', () => {
    const expectedAction = {
      type: ActionType.HIDE_LOADING,
      payload: {
        isLoading: false,
      },
    };
    expect(hideLoadingSkeleton()).toEqual(expectedAction);
  });
});
