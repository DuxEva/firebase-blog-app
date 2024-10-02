import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'blogs/create', component: BlogFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
