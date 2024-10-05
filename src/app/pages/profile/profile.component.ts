import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { BlogService } from '../../services/blog.service';
import { BlogResponse, Comment, CurrentUser } from '../../models';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  currentUser!: CurrentUser;
  isLoaded: boolean = false;
  comments: Comment[] = [];

  constructor(
    private router: Router,
    private blogService: BlogService,
    private auth: AuthService
  ) {}

  data!: BlogResponse[];
  isLoading: boolean = true;

  ngOnInit() {
    this.isLoaded = true;
    this.getCurrentUserBlogs();
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
      } else {
        this.isLoaded = false;
        return;
      }
    });
  }

  getCurrentUserBlogs() {
    this.blogService.getAllBlogs().subscribe((data: BlogResponse[]) => {
      this.data =
        data.filter((blog) => blog.userEmail === this.currentUser.email) || [];
      this.isLoading = false;
    });
  }

  getAllComments() {
    this.data.forEach((blog) => {
      blog?.comments?.forEach((comment) => {
        this.comments.push(comment);
      });
    });
  }

  editProfile() {}
}
