import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { BlogResponse, Comment } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.css',
})
export class SingleBlogComponent {
  blog!: BlogResponse;
  commentForm: FormGroup;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.blogService.getBlogById(id).subscribe((data) => {
          this.blog = data;
        });
      }
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const user = this.auth.currentUserSignal();
      if (!user) return;
      const comment = {
        comment: this.commentForm.value.comment,
        username: user.name,
      };

      this.blogService.addComment(this.blog.id, comment).subscribe(
        (data) => {
          this.blog.comments.push(comment);
          this.toastr.success('Comment added successfully', 'Success');
          this.commentForm.reset();
        },
        (error) => {
          this.toastr.error('Error adding comment', 'Error');
        }
      );
    } else {
      this.commentForm.markAllAsTouched();
    }
  }
}
