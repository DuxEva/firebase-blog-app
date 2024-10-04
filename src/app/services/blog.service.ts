import { Injectable } from '@angular/core';

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  Firestore,
  collectionData,
  DocumentReference,
  DocumentData,
  docData,
} from '@angular/fire/firestore';
import { Blog, BlogResponse } from '../models';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private dbPath = 'blogs';

  constructor(private firestore: Firestore) {}

  // Get all blogs
  getAllBlogs(): Observable<BlogResponse[]> {
    const blogsCollection = collection(this.firestore, this.dbPath);
    return collectionData(blogsCollection, { idField: 'id' }).pipe(
      map((blogs) => {
        return blogs;
      })
    );
  }

  // Create a new blog
  createBlog(blog: Blog): Observable<DocumentReference<DocumentData>> {
    const promise = addDoc(collection(this.firestore, this.dbPath), blog);
    return from(promise);
  }

  // Get a blog by ID
  getBlogById(id: string): Observable<BlogResponse> {
    const blogDoc = doc(this.firestore, `${this.dbPath}/${id}`);
    return docData(blogDoc, { idField: 'id' }) as Observable<BlogResponse>;
  }

  // Update an existing blog by ID
  updateBlog(id: string, blog: Partial<Blog>): Observable<void> {
    const blogDoc = doc(this.firestore, `${this.dbPath}/${id}`);
    const promise = updateDoc(blogDoc, { ...blog });
    return from(promise);
  }

  // Delete a blog by ID
  deleteBlog(id: string): Observable<void> {
    const blogDoc = doc(this.firestore, `${this.dbPath}/${id}`);
    const promise = deleteDoc(blogDoc);
    return from(promise);
  }
}
