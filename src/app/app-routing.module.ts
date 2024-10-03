import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { AuthGuard } from './services/guard/auth-guard.service';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LandingComponent },
  { path: 'blogs', component: BlogsComponent },
  {
    path: 'blogs/create',
    component: BlogFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
