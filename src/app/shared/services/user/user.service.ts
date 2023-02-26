import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { UserModel } from '../../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) {}

  public getUsers(top = 10): Observable<UserModel[]> {
    return this.http.get(`${this.url}?results=${top}`).pipe(
      map((data: any) => {
        const users: UserModel[] = [];
        data.results.forEach((user: any) => {
          users.push({
            uuid: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            address: `${user.location.city}, ${user.location.state}, ${user.location.country}`,
            email: user.email,
            avatar: user.picture.large
          });
        });
        return users;
      })
    );
  }
}
