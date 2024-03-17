import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { ArticleFormValuesInterface } from 'src/app/shared/types/article-form-values.interface';
import { articleActions } from 'src/app/store/actions/article.actions';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { combineLatest } from 'rxjs';
import { selectErrors, selectIsSubmitting } from 'src/app/store/reducers/article.reducer';
import { ArticleRequestInterface } from 'src/app/shared/types/article-request.interface';

@Component({
  selector: 'mc-article-new',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, BannerComponent],
  templateUrl: './article-new.component.html',
  styleUrl: './article-new.component.scss',
})
export class ArticleNewComponent {

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectErrors)
  });

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    }
    this.store.dispatch(articleActions.createArticle({ request }));
  }
}
