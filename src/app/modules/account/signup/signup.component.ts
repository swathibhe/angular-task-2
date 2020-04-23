import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AVOID_SPACE_ONLY, EMAIL_PATTERN } from 'src/app/core/constants/app-constants';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user_creation: FormGroup;
  submitted: boolean;
  spinnerShow = false;
  constructor(private formBuilder: FormBuilder,
    public accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.user_creation = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(AVOID_SPACE_ONLY)]],
      password: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    });
  }

  checkValidationField(formFieldName) {
    if (this.user_creation.controls[formFieldName].invalid && (this.user_creation.controls[formFieldName].dirty ||
      this.user_creation.controls[formFieldName].touched || this.submitted)) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    console.log("this.user_creation", this.user_creation);
    const signUpData = {
      "mobile": this.user_creation.value.mobile,
      "userName": this.user_creation.value.username,
      "password": this.user_creation.value.password,
      "email": this.user_creation.value.email,
      "alterMobile": "",
      "alterEmail": ""
    }
    this.spinnerShow = true;
    this.accountService
      .userSignUp(signUpData)
      .then((res) => {
        console.log(res['body']['data']);
        this.initForm();
        this.router.navigate(['/login']);
        this.spinnerShow = false;
      })
      .catch((err) => {
        this.spinnerShow = false;
      })
  }
}
