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
} from '@angular/fire/firestore';
import { Blog, BlogResponse } from '../models';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private dbPath = 'blogs';

  constructor(private firestore: Firestore) {}

  getAllBlogs(): Observable<BlogResponse[]> {
    const blogsCollection = collection(this.firestore, this.dbPath);
    return collectionData(blogsCollection, { idField: 'id' }).pipe(
      map((blogs) => {
        return blogs;
      })
    );
  }
}
