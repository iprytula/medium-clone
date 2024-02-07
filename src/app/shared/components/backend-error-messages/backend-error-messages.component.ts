import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backend-errors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
})
export class BackendErrorMessagesComponent implements OnChanges {
  @Input() backendErrors: BackendErrorsInterface | null = null;
  errorMessages: string[] = [];

  ngOnChanges(): void {
    this.backendErrors = this.backendErrors || {};
    this.errorMessages = Object.keys(this.backendErrors).map(name => {
      const messages = this.backendErrors![name].join(' ');
      return `${name} ${messages}`;
    });
  }
}
