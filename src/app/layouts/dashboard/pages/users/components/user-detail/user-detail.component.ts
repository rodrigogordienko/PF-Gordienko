import { Component } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { IUser } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { CoursesService } from '../../../courses/courses.service';
import { ICourse } from '../../../courses/models';
import { IInscription } from '../../../inscriptions/models';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  user$: Observable<IUser | undefined>;
  users: IUser[] = [];
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private coursesService: CoursesService,
    private inscriptionsService: InscriptionsService,
  ) {
    this.loading = true;
    this.user$ = this.usersService
      .getUserById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      );
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
  
  ngOnInit(): void {
    this.loadUsers();
  }

  getUserName(userId: number): string {
    const user = this.users.find(user => user.id === userId);
    return user ? user.firstname : 'Usuario Desconocido';
  }
}
