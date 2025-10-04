import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormBuilder } from '@angular/forms';
import { output } from '@angular/core';
import { KanbanStore } from './kanban.store';

@Component({
  selector: 'app-add-task-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="overlay" role="dialog" aria-modal="true">
      <div class="dialog card fade-in">
        <header class="dialog__header">
          <h3 class="dialog__title">Add Task</h3>
        </header>

        <form [formGroup]="form()" (ngSubmit)="onSubmit()" class="dialog__body">
          <label class="field">
            <span class="field__label">Title</span>
            <input
              class="input"
              type="text"
              formControlName="title"
              placeholder="e.g., Ship release"
            />
          </label>
        </form>

        <footer class="dialog__footer">
          <button type="button" class="btn" (click)="onCancel()">Cancel</button>
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="form().invalid"
            (click)="onSubmit()"
          >
            Create
          </button>
        </footer>
      </div>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: grid;
        place-items: center;
        padding: 16px;
        z-index: 40;
      }
      .dialog {
        width: 100%;
        max-width: 520px;
      }
      .dialog__header {
        padding: 14px 16px 0;
      }
      .dialog__title {
        margin: 0;
      }
      .dialog__body {
        padding: 12px 16px;
      }
      .dialog__footer {
        padding: 0 16px 14px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
      .field {
        display: grid;
        gap: 6px;
      }
      .field__label {
        font-size: 12px;
        color: var(--text-muted);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskDialogComponent {
  readonly cancel = output<void>();
  constructor(
    private readonly store: KanbanStore,
    private readonly fb: FormBuilder
  ) {}

  form = computed(() =>
    this.fb.group({
      title: new FormControl('', { nonNullable: true }),
    })
  );

  onCancel(): void {
    this.cancel.emit();
  }

  onSubmit(): void {
    if (this.form().invalid) return;
    this.store.add(this.form().value.title ?? '');
    this.cancel.emit();
  }
}
