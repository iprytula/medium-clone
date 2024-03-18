import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'mc-taglist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './taglist.component.html',
  styleUrl: './taglist.component.scss',
})
export class TaglistComponent {
  @Input() tags: string[] = [];
}
