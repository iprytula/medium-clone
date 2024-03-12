import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { RegisterRequestInterface } from 'src/app/shared/types/register-request.interface';
import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { authActions } from 'src/app/store/actions/auth.actions';
import { selectErrors, selectIsSubmitting } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, BackendErrorMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator('password', 'repeatPassword') });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectErrors)
  });

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  onSubmit() {
    this.registerForm.markAsTouched();

    if (this.registerForm.valid) {
      const { email, username, password } = this.registerForm.getRawValue();
      const request: RegisterRequestInterface = {
        user: { username, email, password }
      };

      this.store.dispatch(authActions.register({ request }));
    }
  }

  private passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }

}
