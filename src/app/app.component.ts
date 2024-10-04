import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { Blog } from './models';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
