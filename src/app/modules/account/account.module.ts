import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { HomeComponent } from './home/home.component';
import { CustomDirectiveModule } from 'src/app/shared/utils/custom-directives/custom-directive.module';


@NgModule({
  declarations: [LoginComponent, SignupComponent, UserListComponent, UserUpdateComponent, HomeComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDirectiveModule,
  ],
})
export class AccountModule { }
