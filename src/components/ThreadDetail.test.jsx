/**
 * @jest-environment jsdom
 */

/**
 * ThreadDetail Testing Scenario
 *
 * - should display the correct owner name
 * - should display the correct title
 * - should display the correct body
 * - should display the correct number of upvotes
 * - should display the correct number of comments
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
import ThreadDetail from './ThreadDetail';

expect.extend(matchers);

describe('ThreadDetail Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display the correct owner name', () => {
    render(
      <ThreadDetail 
        owner={{ name: 'John Doe' }} 
        upVotesBy={[]} 
        comments={[]} 
        upVote={() => {}} 
        downVote={() => {}} 
      />, 
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should display the correct title', () => {
    render(
      <ThreadDetail 
        title="Test Title" 
        owner={{}} 
        upVotesBy={[]} 
        comments={[]} 
        upVote={() => {}} 
        downVote={() => {}} 
      />, 
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should display the correct body', () => {
    render(
      <ThreadDetail 
        body="Test Body" 
        owner={{}} 
        upVotesBy={[]} 
        comments={[]} 
        upVote={() => {}} 
        downVote={() => {}} 
      />, 
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });

  it('should display the correct number of upvotes', () => {
    render(
      <ThreadDetail 
        upVotesBy={['user1', 'user2']} 
        owner={{}} 
        comments={[]} 
        upVote={() => {}} 
        downVote={() => {}} 
      />, 
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should display the correct number of comments', () => {
    render(
      <ThreadDetail 
        comments={['comment1', 'comment2', 'comment3']} 
        owner={{}} 
        upVotesBy={[]} 
        upVote={() => {}} 
        downVote={() => {}} 
      />, 
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
