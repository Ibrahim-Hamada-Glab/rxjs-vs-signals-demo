import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class KanbanStore {
  // --- Signals (state) ---
  readonly tasks = signal<Task[]>([]);
  readonly filter = signal<'all' | 'high'>('all');

  // --- Derived state (placeholders) ---
  readonly todo = computed(() =>
    this.tasks().filter((t) => t.state === 'todo')
  );
  readonly doing = computed(() =>
    this.tasks().filter((t) => t.state === 'doing')
  );
  readonly done = computed(() =>
    this.tasks().filter((t) => t.state === 'done')
  );
  readonly progress = signal(0);

  // --- Side effects (optional) ---
  // TODO: autosave to localStorage
  constructor() {
    this.load();
  }

  // --- Actions (to implement) ---
  add(title: string) {
    this.tasks.update((tasks) => [
      ...tasks,
      { id: crypto.randomUUID(), title, state: 'todo', priority: 'low' },
    ]);
    localStorage.setItem('kanban', JSON.stringify(this.tasks()));
    this.progress.set(
      (this.tasks().filter((t) => t.state === 'done').length /
        this.tasks().length) *
        100
    );
  }
  move(id: string, state: Task['state']) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, state } : task))
    );
    localStorage.setItem('kanban', JSON.stringify(this.tasks()));
    this.progress.set(
      (this.tasks().filter((t) => t.state === 'done').length /
        this.tasks().length) *
        100
    );
  }
  setPriority(id: string, p: Task['priority']) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, priority: p } : task))
    );
    localStorage.setItem('kanban', JSON.stringify(this.tasks()));
    this.progress.set(
      (this.tasks().filter((t) => t.state === 'done').length /
        this.tasks().length) *
        100
    );
  }
  load(): void {
    this.tasks.set(JSON.parse(localStorage.getItem('kanban') ?? '[]'));
    this.progress.set(
      (this.tasks().filter((t) => t.state === 'done').length /
        this.tasks().length) *
        100
    );
  }
  clear(): void {
    this.tasks.set([]);
    localStorage.setItem('kanban', JSON.stringify([]));
    this.tasks.set([]);
    this.progress.set(0);
  }
}
