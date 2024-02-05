import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/actions/auth.actions';
import { RegisterRequestInterface } from 'src/app/shared/types/register-request.inteface';

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.registerForm;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, username, password } = this.registerForm.getRawValue();
      const request: RegisterRequestInterface = {
        user: { username, email, password }
      };

      this.store.dispatch(AuthActions.register({ request }));
    }
  }

}
