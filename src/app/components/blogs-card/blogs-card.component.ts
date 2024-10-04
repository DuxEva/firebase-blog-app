import { Component, Input } from '@angular/core';
import { BlogResponse } from '../../models';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blogs-card',
  templateUrl: './blogs-card.component.html',
  styleUrl: './blogs-card.component.css',
})
export class BlogsCardComponent {
  @Input() blog!: BlogResponse;

  constructor(private router: Router, private blogService: BlogService) {}

  goToSingleBlog(id: string) {
    this.router.navigate(['blogs', id]);
  }

  goToUpdateBlog(id: string) {
    this.blogService.updateBlog(id, this.blog).subscribe((data) => {
      console.log('Update blog', data);
    });
  }

  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).subscribe((data) => {
      console.log('Delete blog', data);
    });
  }
}
