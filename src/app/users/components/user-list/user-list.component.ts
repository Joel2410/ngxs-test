import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AppStateModel } from 'src/app/shared/interfaces/app-state.model';
import { UserModel } from 'src/app/shared/interfaces/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  public users$: Observable<ReadonlyArray<UserModel>> = new Observable();

  constructor(private store: Store) {
    this.users$ = this.store.select((state: AppStateModel) => state.usersState.users);
  }
}
