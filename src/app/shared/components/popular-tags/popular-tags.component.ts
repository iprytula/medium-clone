import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectIsLoading, selectPopularTags } from 'src/app/store/reducers/popular-tags.reducer';
import { popularTagsActions } from 'src/app/store/actions/popular-tags.actions';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterModule],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTags),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError)
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
