import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
  user,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { CurrentUser } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);

  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<{
    name: string;
    email: string;
    uid: string;
  } | null>(null);

  signUp(email: string, password: string, name: string): Observable<any> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
      .then((user) => {
        updateProfile(user.user, { displayName: name });
      })
      .catch((error) => {
        console.log(error);
      });

    return from(promise);
  }

  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((user) => {});

    return from(promise);
  }

  isUserLoggedIn(): CurrentUser | null {
    return this.user$.subscribe((user: User) => {
      if (user) {
        console.log(user);
        this.currentUserSignal.set({
          name: user.displayName!,
          email: user.email!,
          uid: user.uid,
        });
      } else {
        return null;
      }
      console.log('value', this.currentUserSignal());
      return this.currentUserSignal();
    });
  }

  logout(): Observable<void> {
    return from(this.firebaseAuth.signOut());
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
}
