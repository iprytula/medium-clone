import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectIsLoading, selectPopularTags } from 'src/app/store/reducers/popular-tags.reducer';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorMessageComponent, RouterModule],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent {

  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTags),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError)
  });

  constructor(private store: Store) {}
}
