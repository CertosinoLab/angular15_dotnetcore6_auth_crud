import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-signin-component',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription = new Subscription();
  loginForm!: FormGroup;
  authFailed: boolean = false;
  signedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.authService.isSignedIn().subscribe((isSignedIn) => {
      this.signedIn = isSignedIn;
      if (isSignedIn) this.router.navigate(['user']);
    });
  }

  ngOnInit(): void {
    this.authFailed = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public signIn(event: Event) {
    event.preventDefault();
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.signIn(email, password).subscribe(
      (response) => {
        if (response.isSuccess) {
          this.router.navigateByUrl('user');
        }
      },
      (error) => {
        if (!error?.error?.isSuccess) {
          this.authFailed = true;
        }
      }
    );
  }
}
