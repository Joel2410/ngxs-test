import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';

import { AddUser } from 'src/app/shared/state/actions/users.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public items: MenuItem[] = [];

  constructor(private store: Store) {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            command: () => {
              this.addUser();
            }
          }
        ]
      }
    ];
  }

  public addUser(): void {
    this.store.dispatch(new AddUser());
  }
}
