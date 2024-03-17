import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TaglistComponent } from 'src/app/shared/components/taglist/taglist.component';
import { articleActions } from 'src/app/store/actions/article.actions';
import { selectArticleData, selectErrors, selectIsLoading } from 'src/app/store/reducers/article.reducer';
import { selectCurrentUser } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'mc-article',
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterModule, ErrorMessageComponent, TaglistComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {

  isAuthor$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
    article: this.store.select(selectArticleData)
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) return false;

      return article.author.username === currentUser.username;
    })
  );

  data$ = combineLatest({
    article: this.store.select(selectArticleData),
    errors: this.store.select(selectErrors),
    isLoading: this.store.select(selectIsLoading),
    isAuthor: this.isAuthor$
  });

  slug: string = '';

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
    });
  }

  onDelete() {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }

  replaceNewlineToBrTags(text: string): string {
    return text.replace(/\\n/g, '<br>');
  }
}
