import React from 'react';
import { render, act } from '@testing-library/react';
import { UserProvider, useUser } from './UserContext';

const MockComponent = () => {
  const { user, login, logout } = useUser();
  return (
    <div>
      <p data-testid="user">{user ? user.name : 'No user'}</p>
      <button onClick={() => login({ name: 'Test User' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('UserContext', () => {
  test('Default state is null', () => {
    const { getByTestId } = render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    expect(getByTestId('user').textContent).toBe('No user');
  });

  test('Login updates the user state', () => {
    const { getByTestId, getByText } = render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    act(() => {
      getByText('Login').click();
    });

    expect(getByTestId('user').textContent).toBe('Test User');
  });

  test('Logout resets the user state', () => {
    const { getByTestId, getByText } = render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    act(() => {
      getByText('Login').click();
    });

    expect(getByTestId('user').textContent).toBe('Test User');

    act(() => {
      getByText('Logout').click();
    });

    expect(getByTestId('user').textContent).toBe('No user');
  });
});