import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs';
import { User } from '../../model/user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  userService = inject(UserService);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
    this.userService
      .login(
        // TODO: find a better way to do this
        this.loginForm.value.username ?? '',
        this.loginForm.value.password ?? ''
      )
      .pipe(
        catchError((err) => {
          console.log('this is the error: ', err);
          throw err;
        })
      )
      .subscribe((user: User) => {
        console.log('user: ', user);
        if (user._id) {
          localStorage.setItem('id', user._id);
          // TODO: navigate to the habits screen
          this.router.navigate(['/habits']);
        }
      });
  }
}
