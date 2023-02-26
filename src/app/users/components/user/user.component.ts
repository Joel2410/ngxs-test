import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AppStateModel } from 'src/app/shared/interfaces/app-state.model';
import { UserModel } from 'src/app/shared/interfaces/user.model';
import { EditUser, RemoveUser } from 'src/app/shared/state/actions/users.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() public user: UserModel | undefined;

  public isEdit$: Observable<boolean> = new Observable();

  constructor(private store: Store) {
    this.isEdit$ = this.store.select((state: AppStateModel) => state.usersState.isEdit);
  }

  public editUser(): void {
    if (this.user?.uuid) this.store.dispatch(new EditUser(this.user));
  }

  public deleteUser(): void {
    if (this.user?.uuid) this.store.dispatch(new RemoveUser(this.user.uuid));
  }
}
