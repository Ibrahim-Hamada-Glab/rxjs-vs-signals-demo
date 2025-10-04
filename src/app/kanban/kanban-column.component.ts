import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './task.model';
import { TaskCardComponent } from './task-card.component';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-column',
  imports: [CommonModule, TaskCardComponent, CdkDrag, CdkDropList],
  template: `
    <section
      class="col"
      cdkDropList
      [cdkDropListData]="tasks()"
      (cdkDropListDropped)="onDrop($event)"
    >
      <h4 class="col__title">{{ title() }}</h4>
      @for (t of tasks(); track t.id) {
      <app-task-card [task]="t" cdkDrag [cdkDragData]="t"></app-task-card>
      } @empty {
      <p class="muted">No items yet.</p>
      }
    </section>
  `,
  styles: [
    `
      .col {
        border: 1px dashed var(--border);
        border-radius: 12px;
        padding: 12px;
        min-height: 180px;
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--surface), #000 3%),
          color-mix(in srgb, var(--surface), #000 6%)
        );
        display: grid;
        gap: 8px;
        transition: all 0.2s ease;
      }
      .col:hover {
        border-color: var(--accent);
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--surface), var(--accent) 2%),
          color-mix(in srgb, var(--surface), var(--accent) 4%)
        );
      }
      .col.cdk-drop-list-dragging {
        border-color: var(--accent);
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--surface), var(--accent) 5%),
          color-mix(in srgb, var(--surface), var(--accent) 8%)
        );
      }
      .col__title {
        margin: 0 0 6px 0;
        font-weight: 600;
      }
      .muted {
        color: var(--text-muted);
        font-style: italic;
        text-align: center;
        padding: 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent {
  title = input.required<string>();
  tasks = input.required<Task[]>();
  state = input.required<Task['state']>();
  drop = output<CdkDragDrop<Task[]>>();

  onDrop(event: CdkDragDrop<Task[]>) {
    // Add the target state to the event
    const eventWithState = {
      ...event,
      targetState: this.state(),
    };
    this.drop.emit(eventWithState);
  }
}
