import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-taglist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taglist.component.html',
  styleUrl: './taglist.component.scss',
})
export class TaglistComponent {
  @Input() tags: string[] = [];
}
