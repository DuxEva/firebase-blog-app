import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Blog, Comment, CurrentUser } from '../../models';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css',
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  owner!: CurrentUser;
  isActionLoading = false;
  comments!: Comment[];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.blogForm = this.fb.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.owner = this.auth.currentUserSignal() as CurrentUser;
    this.loadBlogDataIfExists();
  }

  private loadBlogDataIfExists(): void {
    if (this.urlId) {
      this.blogService.getBlogById(this.urlId).subscribe((data) => {
        this.comments = data.comments || [];
        this.blogForm.patchValue({
          title: data.title,
          content: data.content,
          image: data.image,
        });
      });
    }
  }

  onSubmit() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }

    this.isActionLoading = true;
    const blog = this.createBlogObject();
    const blogRequest: Observable<any> = this.urlId
      ? this.blogService.updateBlog(this.urlId, blog)
      : this.blogService.createBlog(blog);

    blogRequest.subscribe({
      next: () =>
        this.onSuccess(
          this.urlId ? 'Blog updated successfully' : 'Blog created successfully'
        ),
      error: (error) => this.onError(error.code),
    });
  }

  private createBlogObject(): Blog {
    const { title, content, image } = this.blogForm.value;
    return {
      title,
      content,
      image,
      userId: this.owner.uid,
      userName: this.owner.name,
      userEmail: this.owner.email,
      comments: this.comments,
    };
  }

  private onSuccess(message: string): void {
    this.isActionLoading = false;
    this.toastr.success(message, 'Success');
    this.blogForm.reset();
    this.router.navigate(['/blogs']);
  }

  private onError(errorCode: string): void {
    this.isActionLoading = false;
    this.toastr.error(`${errorCode}`, 'Error');
  }

  get urlId() {
    return this.route.snapshot.paramMap.get('id');
  }
}
