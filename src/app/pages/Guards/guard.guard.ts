import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return auth.getCurrentUser().pipe(
    take(1),
    map((user) => !!user),
    tap((loggedIn) => {
      console.log('logged in', loggedIn);
      if (!loggedIn) {
        router.navigate(['/login']);
      }
    })
  );
};
