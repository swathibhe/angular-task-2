import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { AppData } from 'src/app/shared';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  spinnerShow = false;
  assignedData = [];

  userListDataKey = [
    { displayName: 'User Name', keyName: 'userName', width: '80px' },
    { displayName: 'mobile', keyName: 'mobile', width: '75px' },
    { displayName: 'email', keyName: 'email', width: '80px' },
    { displayName: 'Update Process', keyName: 'button', width: '80px' },
  ];

  constructor(
    public accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.spinnerShow = true;
    this.accountService
      .userList()
      .then((res) => {
        this.assignedData = res['body']['data']['data'];
        console.log(this.assignedData);
        AppData.userList.next(this.assignedData)
        console.log(AppData.userList)
        this.spinnerShow = false;
      })
      .catch((err) => {
        this.spinnerShow = false;
      })
  }

  updateProfile(index) {
    AppData.userId.next(index)
    this.router.navigate(['/home/updateUser']);
  }

}
