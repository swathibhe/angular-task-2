import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private apiService: ApiRequestService
  ) { }

  userSignUp(obj) {
    return this.apiService.post('signup', obj);
  }

  userLogin(obj) {
    return this.apiService.post('login', obj);
  }

  userList() {
    return this.apiService.get('userList');
  }
  
  updateProfile(obj) {
    return this.apiService.post('updateProfile', obj);
  }
  
}
