import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CurrentUser, UserInfo } from '../../models';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAuthenticated!: boolean;
  currentUser!: CurrentUser | null;
  links: { name: string; url: string }[] = [
    {
      name: 'Home',
      url: '/home',
    },
    {
      name: 'Blogs',
      url: '/blogs',
    },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.user$.subscribe((user: User) => {
      if (user) {
        this.auth.currentUserSignal.set({
          name: user.displayName!,
          email: user.email!,
          uid: user.uid,
        });

        this.currentUser = this.auth.currentUserSignal();
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
