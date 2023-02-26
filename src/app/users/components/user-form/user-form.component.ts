import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { UserModel } from 'src/app/shared/interfaces/user.model';
import { AppStateModel } from 'src/app/shared/interfaces/app-state.model';
import { EditUserCancel, EditUserSuccess } from 'src/app/shared/state/actions/users.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public isEdit$: Observable<boolean> = new Observable();
  public user$: Observable<UserModel | undefined> = new Observable();
  public isEdit: boolean | undefined;
  public user: UserModel | undefined;

  public userForm: FormGroup;

  get actionForm(): string {
    return this.isEdit ? 'Update' : 'Save';
  }

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.userForm = this.buildForm();
  }

  public ngOnInit(): void {
    this.isEdit$ = this.store.select((state: AppStateModel) => state.usersState.isEdit);
    this.user$ = this.store.select((state: AppStateModel) => state.usersState.userToEdit);

    this.isEdit$.subscribe((isEdit) => {
      this.isEdit = isEdit;

      if (isEdit) {
        this.user$.subscribe((user) => {
          this.user = user;
          if (user) {
            this.userForm.patchValue(user);
          }
        });
      }
    });
  }

  public onSubmit(): void {
    if (this.user) {
      const uuid = this.user.uuid;
      const { name, address, email, avatar } = this.userForm.value;
      this.store.dispatch(
        new EditUserSuccess({
          uuid,
          name,
          address,
          email,
          avatar
        })
      );
    }
  }

  public onCancel(): void {
    this.store.dispatch(new EditUserCancel());
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', [Validators.required]]
    });
  }
}
