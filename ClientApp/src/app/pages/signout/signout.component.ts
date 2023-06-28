import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth-service';

@Component({
    selector: 'app-signout-component',
    templateUrl: './signout.component.html'
})
export class SignOutComponent implements OnDestroy {
  private subscription: Subscription = new Subscription;
  constructor(private authService: AuthService,
    private router: Router) {
          this.signout();
    }

    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.router.navigateByUrl('signin')
      }
    }

    public signout() {
        this.authService.signOut();
    }
}
