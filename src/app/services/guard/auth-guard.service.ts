import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private auth: AuthService, private route: Router) {}

  canActivate(): boolean {
    if (!this.auth.isUserLoggedIn()) {
      this.route.navigate(['login']);
      return false;
    }
    return true;
  }
}
