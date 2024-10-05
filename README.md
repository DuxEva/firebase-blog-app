# Firebase Blog Platform

This project demonstrates the integration of Angular with Firebase services, focusing on creating a simple "Blog Platform" with authentication, CRUD operations, SEO optimization, Progressive Web App (PWA) features, Firebase Analytics, and deployment to Firebase Hosting.

## Features

### 1. Firebase Authentication

- Email/password registration and login
- Google sign-in option
- User profile page

### 2. Firestore Database

- CRUD operations for blog posts
- Real-time updates for comments

### 3. SEO Optimization

- Server-Side Rendering (SSR) using Angular Universal
- Dynamic meta tags and structured data for each blog post

### 4. Progressive Web App (PWA)

- Manifest file for PWA capabilities
- Service worker for offline access to viewed blog posts

### 5. Firebase Analytics

- Track page views for blog posts
- Custom events for user interactions (comments, likes)

### 6. Deployment

- Deployment to Firebase Hosting
- Optional setup of a custom domain

## Project Structure

- `src/app/auth`: Authentication module (email/password, Google sign-in)
- `src/app/blog`: Blog module for CRUD operations
- `src/app/shared`: Shared services (e.g., MetaService for SEO)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```
1. **How to run project locally**
   ```bash
   ng serve
   ```

Here is the link to the demo deployed on firebase hosting [Firebase Blog Platform](https://fir-blogs-fd11f.web.app/)
