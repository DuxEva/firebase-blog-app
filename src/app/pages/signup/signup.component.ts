import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../../models';
import { AuthService } from '../../services/auth/auth.service';
import { User } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm: FormGroup;
  isNameFocused = false;
  isEmailFocused = false;
  isPasswordFocused = false;
  isPassword2Focused = false;
  isLoading!: boolean;
  OauthLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      const { email, password, name } = this.signUpForm.value;

      this.authService.signUp(email, password, name).subscribe({
        next: (data: User) => {
          this.toastr.success('User signed up successfully', 'Success');
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (error) => {
          this.toastr.error(`${error.code}`, 'Error');
          this.isLoading = false;
        },
      });
    } else {
      this.signUpForm.markAllAsTouched();
      console.log(this.signUpForm.value);
      this.isLoading = false;
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
