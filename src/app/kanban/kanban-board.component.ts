import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanStore } from './kanban.store';
import { AddTaskDialogComponent } from './add-task-dialog.component';
import { KanbanColumnComponent } from './kanban-column.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropListGroup,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task } from './task.model';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CommonModule,
    AddTaskDialogComponent,
    KanbanColumnComponent,
    CdkDropListGroup,
    CdkDropList,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  readonly store = inject(KanbanStore);
  readonly adding = signal(false);

  onDrop(event: CdkDragDrop<Task[]> & { targetState?: Task['state'] }) {
    if (event.previousContainer === event.container) {
      // Reordering within the same column
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Moving between columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the task state based on the target column
      const task = event.item.data;
      const newState = event.targetState || 'todo';
      this.store.move(task.id, newState);
    }
  }
}
