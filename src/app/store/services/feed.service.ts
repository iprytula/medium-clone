import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetFeedResponseInterface } from "../../shared/types/get-feed-response.interface";

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  baseUrl = environment.apiUrl + '/api';

  constructor(private http: HttpClient) { }

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    return this.http.get<GetFeedResponseInterface>(this.baseUrl + url);
  }
}
