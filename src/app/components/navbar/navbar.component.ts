import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  links: { name: string; url: string }[] = [
    {
      name: 'Home',
      url: '/',
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
        this.isAuthenticated = true;
        this.auth.currentUserSignal.set({
          name: user.displayName!,
          email: user.email!,
          uid: user.uid,
        });
      } else {
        this.isAuthenticated = false;
      }
      console.log(this.auth.currentUserSignal());
    });
  }

  logout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
