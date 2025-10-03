import { Routes } from '@angular/router';
import { KanbanBoardComponent } from './kanban/kanban-board.component';
import { SearchPageComponent } from './search/search-page.component';

export const routes: Routes = [
  { path: 'kanban', component: KanbanBoardComponent },
  { path: 'search', component: SearchPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'kanban' },
];
