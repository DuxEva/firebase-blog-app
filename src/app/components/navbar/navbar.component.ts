import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  links: { name: string; url: string }[] = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Blogs',
      url: '/blogs',
    },
    {
      name: 'Login',
      url: '/login',
    },
  ];
}
