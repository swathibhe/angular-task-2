import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { EMAIL_PATTERN, AVOID_SPACE_ONLY } from 'src/app/core/constants/app-constants';
import { AppData } from 'src/app/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_form: FormGroup;
  submitted: boolean;
  spinnerShow = false;
  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.login_form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(AVOID_SPACE_ONLY)]],
      password: ['', Validators.required],
    });
  }

  checkValidationField(formFieldName) {
    if (this.login_form.controls[formFieldName].invalid && (this.login_form.controls[formFieldName].dirty ||
      this.login_form.controls[formFieldName].touched || this.submitted)) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    console.log("this.login_form", this.login_form);
    const loginData = {
      "userName": this.login_form.value.username,
      "password": this.login_form.value.password,
    }
    this.spinnerShow = true;
    this.accountService
      .userLogin(loginData)
      .then((res) => {
        console.log(res['body']['data']);
        AppData.userDataSubject.next(res['body']['data'])
        AppData.token.next(res['body']['data'].token)
        AppData.isAuthenticated = true;
        this.initForm();
        this.router.navigate(['/home']);
        this.spinnerShow = false;
      })
      .catch((err) => {
        this.spinnerShow = false;
      })
  }

}
