import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { authActions } from 'src/app/store/actions/auth.actions';
import { selectErrors, selectIsSubmitting } from 'src/app/store/reducers/auth.reducer';
import { LoginRequestInterface } from '../../../shared/types/login-request.interface';

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, BackendErrorMessagesComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectErrors)
  });

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  onSubmit() {
    this.loginForm.markAsTouched();

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      const request: LoginRequestInterface = {
        user: { email, password }
      };

      this.store.dispatch(authActions.login({ request }));
    }
  }

}
