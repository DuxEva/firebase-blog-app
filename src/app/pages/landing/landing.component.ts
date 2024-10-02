import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  SubscriptionPlatforms = [
    {
      id: 1,
      name: 'App Podcasts',
    },
    {
      id: 2,
      name: 'Spotify',
    },
    {
      id: 3,
      name: 'Google',
    },
    {
      id: 4,
      name: 'Stitcher',
    },
  ];
}
