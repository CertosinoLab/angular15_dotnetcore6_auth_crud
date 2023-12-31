import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) { }

    isSigninRoute(): boolean {
      return this.router.url.includes('/signin');
    }
}
