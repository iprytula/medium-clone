import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/store/reducers/auth.reducer';
import { combineLatest } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser)
  });

  constructor(private store: Store) {}
}
