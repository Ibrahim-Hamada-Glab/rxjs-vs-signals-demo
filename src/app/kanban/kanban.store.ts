import { Injectable, signal, computed /*, effect */ } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class KanbanStore {
  // --- Signals (state) ---
  readonly tasks = signal<Task[]>([]);
  readonly filter = signal<'all' | 'high'>('all');

  // --- Derived state (placeholders) ---
  readonly todo  = computed(() => this.tasks().filter(t => t.state === 'todo'));
  readonly doing = computed(() => this.tasks().filter(t => t.state === 'doing'));
  readonly done  = computed(() => this.tasks().filter(t => t.state === 'done'));
  readonly progress = computed(() => 0); // TODO: implement %

  // --- Side effects (optional) ---
  // TODO: autosave to localStorage
  // effect(() => localStorage.setItem('kanban', JSON.stringify(this.tasks())));

  // --- Actions (to implement) ---
  add(title: string) { /* TODO */ }
  move(id: string, state: Task['state']) { /* TODO */ }
  setPriority(id: string, p: Task['priority']) { /* TODO */ }
  load(): void { /* TODO: load from storage if you want */ }
  clear(): void { /* TODO */ }
}
