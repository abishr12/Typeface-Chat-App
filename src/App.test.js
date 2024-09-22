import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders chat app', () => {
  render(<App />);

  const addChatButton = screen.getByText(/add chat/i);
  expect(addChatButton).toBeInTheDocument();

  const sidePanelUser = screen.getByText(/sara/i);
  expect(sidePanelUser).toBeInTheDocument();

  const timestamp = screen.getByText(/jan 19/i);
  expect(timestamp).toBeInTheDocument();

  const chatText = screen.getByText(/hello, adham/i);
  expect(chatText).toBeInTheDocument();

  const chatTextBox = screen.getByLabelText(/chat here/i);
  expect(chatTextBox).toBeInTheDocument();
});

test('navigates to different chats', () => {
  render(<App />);
  expect(screen.getByText(/add chat/i)).toBeInTheDocument();
  userEvent.click(screen.getByText(/sara/i));
  waitFor(() => {
    expect(screen.getByText(/hello sara/i)).toBeInTheDocument();
  });
});

test('adds chat user', async () => {
  render(<App />);
  expect(screen.getByText(/add chat/i)).toBeInTheDocument();
  act(() => {
    userEvent.click(screen.getByText(/add chat/i));
  });
  const newUserTextBox = screen.getByLabelText(/add user chat/i);
  await waitFor(() => {
    expect(newUserTextBox).toBeInTheDocument();
  });

  userEvent.type(newUserTextBox, 'Clark');
  fireEvent.keyDown(newUserTextBox, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13,
  });

  await waitFor(() => {
    expect(newUserTextBox).not.toBeInTheDocument();
    expect(screen.getByText(/clark/i)).toBeInTheDocument();
  });
});

test('deletes chat user', async () => {
  render(<App />);
  expect(screen.getByText(/add chat/i)).toBeInTheDocument();
  userEvent.click(screen.getByText(/sara/i));
  waitFor(() => {
    expect(screen.getByText(/hello sara/i)).toBeInTheDocument();
  });

  userEvent.click(screen.getByLabelText(/delete sara chat/i));
  waitFor(() => {
    expect(screen.getByText(/sara/i)).not.toBeInTheDocument();
  });
});

test('sends message', async () => {
  render(<App />);
  expect(screen.getByText(/add chat/i)).toBeInTheDocument();
  userEvent.click(screen.getByText(/sara/i));
  waitFor(() => {
    expect(screen.getByText(/hello sara/i)).toBeInTheDocument();
  });

  const messageTextBox = screen.getByLabelText(/chat here/i);
  userEvent.type(messageTextBox, 'nice to meet you sara');
  fireEvent.keyDown(messageTextBox, {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    charCode: 13,
  });

  waitFor(() => {
    expect(screen.getByText(/hello sara/i)).toBeInTheDocument();
    expect(screen.getByText(/nice to meet you sara/i)).toBeInTheDocument();
  });
});
