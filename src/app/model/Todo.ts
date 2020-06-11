import {Action} from './Action';

export interface Todo {
    id: number;
    title: string;
    description: string;
    favorite: boolean;
    time: string;
    energy: string;
    dueDate: Date;
    action_id: number;
    completed: boolean;
    action: Action;
  }

