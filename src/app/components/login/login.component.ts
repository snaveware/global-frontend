import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = 'Login error';
  showError: boolean = false;
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (UtilsService.checkInitialLoginStatus()) {
      this.router.navigate(['/']);
    }

    alert(
      'Guest Login Email: info@snaveware.com  , Guest Login Password: password'
    );
  }

  onSubmit(email, password) {
    this.isLoading = true;

    this.authService.login({ email, password }).subscribe((result) => {
      this.isLoading = false;
      this.afterSubscribing(result);
    });
  }

  selected(selection) {
    this.showError = false;
  }

  afterSubscribing(result) {
    if (!result) {
      this.errorMessage = 'unknown result. Contact the admin';
      this.showError = true;
    }
    if (result.isError) {
      this.errorMessage = result.message;
      this.showError = true;
      console.log('error login', result.message);
    } else {
      this.authService.isLoggedIn = { state: true, details: result };
      this.router.navigateByUrl('/').then(() => {
        location.reload();
      });
    }
    console.log('login', result);
  }
}
