import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { feedActions } from 'src/app/store/actions/feed.actions';
import { selectError, selectFeed, selectIsLoading } from 'src/app/store/reducers/feed.reducer';
import { environment } from 'src/environments/environment.development';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'mc-feed',
  standalone: true,
  imports: [CommonModule, RouterModule, ErrorMessageComponent, LoadingComponent, PaginationComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = '';
  paginationLimit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage = 0;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeed)
  });

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));

    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = +params['page'] || 1;
    });
  }
}
