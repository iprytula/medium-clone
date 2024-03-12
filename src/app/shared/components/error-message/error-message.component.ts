import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `<div>{{ message }}</div>`,
  styles: ``,
})
export class ErrorMessageComponent {
  @Input() message: string = 'Something went wrong';
}
