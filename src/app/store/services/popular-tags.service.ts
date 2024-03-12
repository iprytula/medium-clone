import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PopularTagsRespondInterface } from 'src/app/shared/types/popular-tags-respond.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PopularTagsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPopularTags(): Observable<string[]> {
    return this.http.get<PopularTagsRespondInterface>(`${this.baseUrl}/tags`).pipe(
      map(response => response.tags)
    );
  }
}
