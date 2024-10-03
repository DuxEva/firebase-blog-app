import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { BlogResponse } from '../../models';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.css',
})
export class SingleBlogComponent {
  blog!: BlogResponse;
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID', id);
      if (id) {
        this.blogService.getBlogById(id).subscribe((data) => {
          console.log('Blog', data);
          this.blog = data;
        });
      }
    });
  }
}
