import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { authActions } from './store/actions/auth.actions';
import { popularTagsActions } from './store/actions/popular-tags.actions';

@Component({
  standalone: true,
  imports: [RouterModule, TopBarComponent],
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
