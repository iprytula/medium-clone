import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ArticleFormValuesInterface } from 'src/app/shared/types/article-form-values.interface';
import { ArticleRequestInterface } from 'src/app/shared/types/article-request.interface';
import { articleActions } from 'src/app/store/actions/article.actions';
import { selectArticleData, selectIsLoading } from 'src/app/store/reducers/article.reducer';
import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'mc-article-update',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, BannerComponent, LoadingComponent],
  templateUrl: './article-update.component.html',
  styleUrl: './article-update.component.scss',
})
export class ArticleUpdateComponent implements OnInit, OnDestroy {

  constructor(private store: Store, private route: ActivatedRoute) {}

  initialValues$: Observable<ArticleFormValuesInterface | null> = this.store.select(selectArticleData).pipe(
    map((article) => {
      if (article) {
        const initialValues: ArticleFormValuesInterface = {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        };
        return initialValues;
      }
      return null;
    })
  );

  data$ = combineLatest({
    article: this.store.select(selectArticleData),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$
  });

  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  componentDestroyed$: Subject<boolean> = new Subject();

  ngOnInit(): void {
    if (this.slug) {
      this.data$.pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (!data.article || data.article.slug !== this.slug) {
          this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
        }
      });
    }
  }

  onSubmit(formValues: ArticleFormValuesInterface) {
    const request: ArticleRequestInterface = {
      article: formValues
    };
    this.store.dispatch(articleActions.updateArticle({ slug: this.slug, request }));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
