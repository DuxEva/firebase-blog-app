import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isInputFocused: boolean = false;
  isPasswordFocused: boolean = false;
  isLoader!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  private authService = inject(AuthService);

  onSubmit() {
    this.isLoader = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoader = false;
          this.toastr.success('User logged in successfully', 'Success');
          this.router.navigate(['/blogs']);
        },
        error: (error) => {
          this.toastr.error(`${error.code}`, 'Error');
          this.isLoader = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
