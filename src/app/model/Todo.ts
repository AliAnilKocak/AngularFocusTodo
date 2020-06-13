import {Action} from './Action';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  time?: any;
  energy?: any;
  dueDate?: any;
  action_id: number;
  action: Action;
  completed: boolean;
  favorite: boolean;
}

