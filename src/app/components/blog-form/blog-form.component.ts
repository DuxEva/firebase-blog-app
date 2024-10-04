import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Blog, CurrentUser } from '../../models';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css',
})
export class BlogFormComponent {
  blogForm: FormGroup;
  owner!: CurrentUser;
  isActionLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.owner = this.auth.currentUserSignal() as CurrentUser;
  }

  onSubmit() {
    console.log('Form value', this.blogForm.value);
    if (this.blogForm.valid) {
      this.isActionLoading = true;
      const blog: Blog = {
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
        image: this.blogForm.value.image,
        user_id: this.owner.uid,
      };
      this.blogService.createBlog(blog).subscribe({
        next: (data) => {
          this.isActionLoading = false;
          this.toastr.success('Blog created successfully', 'Success');
          this.blogForm.reset();
          this.router.navigate(['/blogs']);
        },
        error: (error) => {
          this.isActionLoading = false;
          this.toastr.error(`${error.code}`, 'Error');
        },
      });
    } else {
      this.blogForm.markAllAsTouched();
      this.isActionLoading = false;
      console.log('Form is invalid');
    }
  }
}
