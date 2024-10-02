import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private dbPath = '/blogs';

  blogRef: AngularFireList<any> | undefined;

  constructor(private db: AngularFireDatabase) {
    this.blogRef = db.list(this.dbPath);
  }

  getAllBlogs(): AngularFireList<any> {
    return this.blogRef!;
  }

  createBlog(blog: any): any {
    return this.blogRef!.push(blog);
  }

  updateBlog(key: string, value: any): Promise<void> {
    return this.blogRef!.update(key, value);
  }

  deleteBlog(key: string): Promise<void> {
    return this.blogRef!.remove(key);
  }

  getBlog(key: string): Promise<any> {
    return this.blogRef!.query.equalTo(key).once('value');
  }
}
