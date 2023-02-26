import { UserModel } from './user.model';

export interface UsersStateModel {
  loading: boolean;
  isEdit: boolean;
  userToEdit: UserModel | undefined;
  users: ReadonlyArray<UserModel>;
}
