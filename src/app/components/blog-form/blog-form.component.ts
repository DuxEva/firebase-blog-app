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
      image: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form value', this.blogForm.value);
    if (this.blogForm.valid) {
      const blog: Blog = {
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
        image: this.blogForm.value.image,
      };

      console.log('Form is valid', blog);
    } else {
      this.blogForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
