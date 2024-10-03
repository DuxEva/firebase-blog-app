import { Component, OnInit } from '@angular/core';
import { Blog, BlogResponse } from '../../models';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  title = 'firebase-blogs';
  data: BlogResponse[] = [];
  isLoading: boolean = true;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe((data: BlogResponse[]) => {
      this.data = data;
      this.isLoading = false;
    });
  }
}
