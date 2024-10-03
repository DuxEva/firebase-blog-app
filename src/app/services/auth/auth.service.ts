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
import { UserInfo } from '../../models';

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

  login(email: string, password: string): Observable<User> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
        (cred) => cred.user
      )
    );
  }

  isUserLoggedIn(): boolean {
    return !!this.firebaseAuth.currentUser;
  }

  logout(): Observable<void> {
    return from(this.firebaseAuth.signOut());
  }
}
