import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './task.model';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  template: `
    <article class="task-card">
      <header class="task-card__header">
        <h5 class="task-card__title">{{ task().title }}</h5>
        <span
          class="task-card__badge"
          [class._high]="task().priority === 'high'"
        >
          {{ task().priority }}
        </span>
      </header>
    </article>
  `,
  styles: [
    `
      .task-card {
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 10px;
        background: var(--surface-2);
        cursor: grab;
        transition: all 0.2s ease;
        user-select: none;
      }
      .task-card:hover {
        border-color: var(--accent);
        box-shadow: 0 2px 8px color-mix(in srgb, var(--accent), transparent 20%);
        transform: translateY(-1px);
      }
      .task-card.cdk-drag-dragging {
        cursor: grabbing;
        box-shadow: 0 4px 16px color-mix(in srgb, var(--accent), transparent 30%);
        transform: rotate(2deg);
      }
      .task-card.cdk-drag-placeholder {
        opacity: 0.4;
        background: color-mix(in srgb, var(--surface), var(--accent) 5%);
        border: 2px dashed var(--accent);
      }
      .task-card__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }
      .task-card__title {
        margin: 0;
        font-weight: 600;
      }
      .task-card__badge {
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 999px;
        border: 1px solid var(--border);
        color: var(--text-muted);
      }
      .task-card__badge._high {
        background: color-mix(in srgb, var(--accent), #000 10%);
        color: var(--accent-contrast);
        border-color: color-mix(in srgb, var(--accent), #000 20%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  task = input.required<Task>();
}
