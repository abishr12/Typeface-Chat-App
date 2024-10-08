export interface Message {
  id: number;
  text: string;
  userId: number;
  timestamp: number;
}

export interface User {
  id: number;
  name: string;
}
export interface UserList {
  [key: number]: User;
}

export interface MessageList {
  [key: number]: Message[];
}
