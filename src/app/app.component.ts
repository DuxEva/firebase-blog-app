import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { Blog } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'firebase-blogs';
  data: Blog[] = [];

  constructor(private blogService: BlogService) {}



  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService
      .getAllBlogs()
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((element) => {
          console.log('key', element.key);
          console.log('payload', element.payload.val());
          this.data.push({
            key: element.key,
            ...element.payload.val(),
          });
        });
      });
  }
}
