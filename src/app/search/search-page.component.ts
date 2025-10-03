import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchService, Repo } from './search.service';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  private api = inject(SearchService);

  // Basic form skeleton
  form = new FormGroup({
    q: new FormControl('', { nonNullable: true }),
    lang: new FormControl<string | ''>('', { nonNullable: true }),
  });

  page = new FormControl(1, { nonNullable: true });

  // Streams (placeholders)
  repos$: Observable<Repo[]> = of([]);        // TODO: combineLatest + switchMap
  loading$: Observable<boolean> = of(false);  // TODO: derive from streams
  events$ = this.api.liveEvents$;             // TODO: implement polling in service

  // TODO: add router query param syncing if desired
}
