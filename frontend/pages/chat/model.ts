export interface User {
  id: number;
  name: string;
}

export interface Message {
  id?: number;
  message: string;
  author: string;
}
