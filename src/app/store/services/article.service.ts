import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleRequestInterface } from 'src/app/shared/types/article-request.interface';
import { ArticleResponseInterface } from 'src/app/shared/types/article-response.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getArticle(slug: string): Observable<ArticleInterface> {
    return this.http.get<ArticleResponseInterface>(`${this.baseUrl}/articles/${slug}`).pipe(
      map(response => response.article)
    );
  }

  deleteArticle(slug: string): Observable<object> {
    return this.http.delete(`${this.baseUrl}/articles/${slug}`);
  }

  createArticle(articleRequest: ArticleRequestInterface): Observable<ArticleInterface> {
    return this.http.post<ArticleResponseInterface>(`${this.baseUrl}/articles`, articleRequest).pipe(
      map(response => response.article)
    )
  }

  updateArticle(slug: string, articleRequest: ArticleRequestInterface): Observable<ArticleInterface> {
    return this.http.put<ArticleResponseInterface>(`${this.baseUrl}/articles/${slug}`, articleRequest).pipe(
      map(({ article }) => article)
    )
  }

}
