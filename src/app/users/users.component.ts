import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserService } from '../shared/services/user/user.service';
import { GetUsersList } from '../shared/state/actions/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public isEdit$: Observable<boolean> = new Observable();
  public loadingUsers$: Observable<boolean> = new Observable();

  constructor(private store: Store, private usersService: UserService) {
    this.isEdit$ = this.store.select((state) => state.usersState.isEdit);
    this.loadingUsers$ = this.store.select<boolean>((state) => state.usersState.loading);
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.store.dispatch(new GetUsersList());
  }
}
