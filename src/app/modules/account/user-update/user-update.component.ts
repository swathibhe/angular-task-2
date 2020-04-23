import { Component, OnInit } from '@angular/core';
import { AppData, ToastService } from 'src/app/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { EMAIL_PATTERN, AVOID_SPACE_ONLY } from 'src/app/core/constants/app-constants';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  usetData;
  userId;
  user_update: FormGroup;
  submitted: boolean;
  alterMob = false;
  alterEml = false;
  spinnerShow = false;
  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toasterService: ToastService
  ) {
    AppData.userId.subscribe((data) => {
      this.userId = data;
    });
    AppData.userList.subscribe((data) => {
      console.log('data', data)
      this.usetData = data[this.userId];
    });
  }

  ngOnInit() {
    this.initForm();
    console.log(this.usetData);
    this.setValues();
  }

  initForm() {
    this.user_update = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(AVOID_SPACE_ONLY)]],
      password: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      alterMobile: [''],
      alterEmail: [''],
    });
  }

  setValues() {
    this.user_update.controls.username.setValue(this.usetData.userName);
    this.user_update.controls.mobile.setValue(this.usetData.mobile);
    this.user_update.controls.email.setValue(this.usetData.email);
  }

  checkValidationField(formFieldName) {
    if (this.user_update.controls[formFieldName].invalid && (this.user_update.controls[formFieldName].dirty ||
      this.user_update.controls[formFieldName].touched || this.submitted)) {
      return true;
    } else {
      return false;
    }
  }

  status(value) {
    if (value === "mobile") {
      this.alterMob = true;
    } else {
      this.alterEml = true;
    }
  }

  onSubmit() {
    const signUpData = {
      "mobile": this.user_update.value.mobile,
      "userName": this.user_update.value.username,
      "password": this.user_update.value.password,
      "email": this.user_update.value.email,
      "alterMobile": this.user_update.value.alterMobile,
      "alterEmail": this.user_update.value.alterEmail
    }
    this.spinnerShow = true;
    this.accountService
      .updateProfile(signUpData)
      .then((res) => {
        console.log(res['body']['message']);
        this.toasterService.presentToast(res['body']['message'], 'Success', 'success');
        this.initForm();
        this.router.navigate(['/home']);
        this.spinnerShow = false;
      })
      .catch((err) => {
        this.spinnerShow = false;
      })
  }

}
