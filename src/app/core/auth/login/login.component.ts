import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);
  private readonly id = inject(PLATFORM_ID)

  subscription: Subscription = new Subscription();

  msgError: string = '';

  msgSuccess: string = 'Successfully Login';

  isLoading: boolean = false;

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initLogin();
  }

  initLogin(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();

      this.isLoading = true;

      this.subscription = this.authService
        .loginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.msgError = this.msgSuccess;
            if (res.message === 'success' && isPlatformBrowser(this.id)) {
              this.cookieService.set('token', res.token);

              console.log(this.authService.decodeToken());

              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 1000);
            }
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
          },
        });
    }
  }
}
