import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { UserModel } from '../../interfaces/user.model';
import { UsersStateModel } from '../../interfaces/users-state.model';
import { UserService } from '../../services/user/user.service';
import {
  AddUser,
  EditUser,
  EditUserCancel,
  EditUserSuccess,
  GetUsersList,
  RemoveUser
} from '../actions/users.actions';

@State<UsersStateModel>({
  name: 'usersState',
  defaults: {
    loading: false,
    isEdit: false,
    userToEdit: undefined,
    users: []
  }
})
@Injectable()
export class UsersState {
  constructor(private userService: UserService) {}

  @Action(GetUsersList)
  getUsersList(ctx: StateContext<UsersStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: true
    });

    return this.userService.getUsers().pipe(
      tap((users) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          loading: false,
          users: [...state.users, ...users]
        });
      })
    );
  }

  @Action(AddUser)
  addUser(ctx: StateContext<UsersStateModel>) {
    return this.userService.getUsers(1).pipe(
      tap((users) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          users: [...state.users, ...users]
        });
      })
    );
  }

  @Action(RemoveUser)
  removeUser(ctx: StateContext<UsersStateModel>, { uuid }: { uuid: string }) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      users: [...state.users.filter((user) => user.uuid !== uuid)]
    });
  }

  @Action(EditUser)
  editUser(ctx: StateContext<UsersStateModel>, { user }: { user: UserModel }) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isEdit: true,
      userToEdit: user
    });
  }

  @Action(EditUserSuccess)
  editUserSuccess(ctx: StateContext<UsersStateModel>, { user }: { user: UserModel }) {
    const state = ctx.getState();
    const users = [...state.users];
    if (state.userToEdit) {
      const index = users.indexOf(state.userToEdit);
      users.splice(index, 1, user);
    }
    ctx.setState({
      ...state,
      isEdit: false,
      userToEdit: undefined,
      users
    });
  }

  @Action(EditUserCancel)
  editUserCancel(ctx: StateContext<UsersStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isEdit: false,
      userToEdit: undefined
    });
  }
}
