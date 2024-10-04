import { Component, Input } from '@angular/core';
import { BlogResponse } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-card',
  templateUrl: './blogs-card.component.html',
  styleUrl: './blogs-card.component.css',
})
export class BlogsCardComponent {
  @Input() blog!: BlogResponse;

  constructor(private router: Router) {}

  goToSingleBlog(id: string) {
    this.router.navigate(['blogs', id]);
  }
}
