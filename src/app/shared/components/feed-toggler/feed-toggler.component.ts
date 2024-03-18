import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/store/reducers/auth.reducer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mc-feed-toggler',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feed-toggler.component.html',
  styleUrl: './feed-toggler.component.scss',
})
export class FeedTogglerComponent {
  @Input() tagName?: string;

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {}
}
