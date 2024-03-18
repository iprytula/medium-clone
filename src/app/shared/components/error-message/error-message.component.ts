import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorsInterface } from '../../types/backend-errors.interface';

@Component({
  selector: 'mc-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `<div>{{ message }}</div>`,
  styles: ``,
})
export class ErrorMessageComponent {
  @Input() message: BackendErrorsInterface | string | null = null;
}
