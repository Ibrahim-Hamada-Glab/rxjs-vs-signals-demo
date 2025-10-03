import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Repo {
  id: number;
  full_name: string;
  // TODO: add the fields you need
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  /** TODO: implement real request; placeholder returns empty array */
  searchRepos$(q: string, lang: string | null, page: number): Observable<Repo[]> {
    // Example for later:
    // const params = new HttpParams()
    //   .set('q', `${q}${lang ? ' language:' + lang : ''}`)
    //   .set('page', page)
    //   .set('per_page', 10);
    // return this.http.get<{ items: Repo[] }>('https://api.github.com/search/repositories', { params })
    //   .pipe(map(r => r.items));
    return of([]);
  }

  /** TODO: expose polling stream later; placeholder is an empty observable */
  liveEvents$ /*: Observable<any[]>*/ = of([]);
}
