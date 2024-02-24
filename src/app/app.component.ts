import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';

@Component({
  standalone: true,
  imports: [RouterModule, TopBarComponent],
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'medium-clone';
}               
