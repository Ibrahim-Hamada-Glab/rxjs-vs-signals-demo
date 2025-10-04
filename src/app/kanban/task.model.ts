export type TaskState = 'todo' | 'doing' | 'done';
export type TaskPriority = 'low' | 'high';

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  state: TaskState;
}
