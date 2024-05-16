import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from './users.service';

export const USERS = new InjectionToken('USERS');
export const RANDOM_NUMBER = new InjectionToken('RANDOM_NUMBER');

@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [
    // CoursesService,
    {
      provide: UsersService,
      useClass: UsersService,
    },
    {
      provide: RANDOM_NUMBER,
      useFactory: () => {
        return Math.random();
      },
    },
    {
      provide: USERS,
      useFactory: (usersService: UsersService) => {
        return usersService.getUsers();
      },
      deps: [UsersService],
    },
  ],
  exports:[
    UsersComponent
  ]
})
export class UsersModule { }