import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth-service';
import { UserClaim } from '../../auth/user-claim';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnDestroy {
    private authSubscription: Subscription = new Subscription;
    userClaims: UserClaim[] = [];
    constructor(private authService: AuthService) {
        this.getUser();
    }

  getUser() {
    this.authSubscription = this.authService.user().subscribe(
            result => {
                this.userClaims = result;
            });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
