import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { BlogService } from '../../services/blog.service';
import { BlogResponse, CurrentUser } from '../../models';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  currentUser!: CurrentUser;
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private auth: AuthService
  ) {}

  data!: BlogResponse[];
  isLoading: boolean = true;

  user = {
    name: 'John Doe',
    profilePicture: 'assets/profile-pic.jpg',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    location: 'New York, USA',
    dob: '1990-05-15',
    status: 'Online',
    bio: 'Enthusiastic developer with a passion for building great apps.',
    postsCount: 45,
    likesCount: 120,
    commentsCount: 89,
    recentPosts: [
      'Completed a new blog post on Angular directives!',
      'Loving the new Firebase integration in my project.',
      'Had an insightful discussion on web performance optimization.',
    ],
  };

  ngOnInit() {
    this.isLoaded = true;
    this.getAllBlogs();
    this.auth.user$.subscribe((user: User) => {
      if (user) {
        this.auth.currentUserSignal.set({
          name: user.displayName!,
          email: user.email!,
          uid: user.uid,
        });

        const currentUser = this.auth.currentUserSignal();
        if (currentUser) {
          this.currentUser = currentUser;
          this.isLoaded = false;
        }
        console.log('Current user from profile', this.currentUser);
      } else {
        this.isLoaded = false;
        return;
      }
    });
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe((data: BlogResponse[]) => {
      this.data = data || [];
      this.isLoading = false;
    });
  }

  editProfile() {}
}
