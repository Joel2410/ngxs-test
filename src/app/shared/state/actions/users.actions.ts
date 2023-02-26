import { UserModel } from '../../interfaces/user.model';

export class GetUsersList {
  static readonly type = '[User] Get User List';
}

export class AddUser {
  static readonly type = '[User] Add User';
}

export class RemoveUser {
  static readonly type = '[User] Remove User';
  constructor(public uuid: string) {}
}

export class EditUser {
  static readonly type = '[User] Edit User';
  constructor(public user: UserModel) {}
}

export class EditUserSuccess {
  static readonly type = '[User] Edit User Success';
  constructor(public user: UserModel) {}
}

export class EditUserCancel {
  static readonly type = '[User] Edit User Cancel';
}
