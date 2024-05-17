import { Component, ViewChild, OnInit } from '@angular/core';
import { IUser } from './models';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from './components/user-detail/user-detail.component'; 
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UsersService } from './users.service';
import { Store } from '@ngrx/store';
import { UserActions } from './store/user.actions';
import {
  selectIsLoading,
  selectUsers,
  selectUsersError,
} from './store/user.selectors';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<IUser[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<Error>;
  displayedColumns: string[] = [
    'id',
    'fullname',
    'email',
    'role',
    'phone',
    'address',
    'createdAt',
    'actions',
  ];

  constructor(private matDialog: MatDialog, private usersService: UsersService, private store: Store) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.users$ = this.store.select(selectUsers);
    this.error$ = this.store
      .select(selectUsersError)
      .pipe(map((err) => err as Error));
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  openDialog(editingUser?: IUser): void {
    this.users$.subscribe(users => {
      let maxId = users.length > 0 ? Math.max(...users.map(user => Number(user.id))) : 0;
      this.matDialog
        .open(UserDialogComponent, {
          data: editingUser,
        })
        .afterClosed()
        .subscribe({
          next: (result) => {
            if (result) {
              if (editingUser) {
                result.createdAt = editingUser.createdAt;
                this.store.dispatch(UserActions.updateUser({ id: editingUser.id, payload: result }));
              } else {
                result.id = (maxId + 1).toString();
                result.createdAt = new Date();
                this.store.dispatch(UserActions.createUser({ payload: result }));
              }
            }
          },
        });
    }).unsubscribe();
  }

  deleteUserById(id: number): void {
    Swal.fire({
      icon: 'question',
      html: `¿Está seguro?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(UserActions.deleteUserById({ id }));
      }
    });
  }
}