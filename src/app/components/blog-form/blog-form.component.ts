import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Blog } from '../../models';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css',
})
export class BlogFormComponent {
  blogForm: FormGroup;

  constructor(private fb: FormBuilder, private blogService: BlogService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blog: Blog = {
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
        key: '',
      };

      this.blogService.createBlog(blog).then((data: Blog) => {
        console.log('Blog created successfully', data);
        this.blogForm.reset();
      });
    } else {
      this.blogForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
