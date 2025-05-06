import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.type';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  constructor() {}

  login(username: string, password: string) {
    const url = `http://localhost:3000/users/username/${username}/password/${password}`;
    const user = this.http.get<User>(url);
    return user;
  }
}
