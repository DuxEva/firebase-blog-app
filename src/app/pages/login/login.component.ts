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
  OauthLoader: boolean = false;

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
    if (this.loginForm.valid) {
      this.isLoader = true;
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

  signInWithGoogle(): void {
    this.OauthLoader = true;
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.OauthLoader = false;
        this.toastr.success('User signed up successfully', 'Success');

        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.toastr.error(`${error.code}`, 'Error');
        this.OauthLoader = false;
      },
    });
  }
}
