import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppData {
  static token = new BehaviorSubject(null);
  static baseUrl = environment.baseUrl;
  static userList = new BehaviorSubject(null);
  static userId = new BehaviorSubject(null);
  static viewPromoData = new BehaviorSubject(null);
  static isAuthenticated = false;
  static userDataSubject = new BehaviorSubject(null);
  static userData: UserModel;
  static citys = new BehaviorSubject(null);
  // below will be used for checking if we have to change pointer of side menu
  static appPermissionCheck = new BehaviorSubject('init');

  static deliveryPartnerSub$ = new BehaviorSubject(null);

  constructor(private storage: StorageService) {
    console.log('AppData',AppData);
    if (this.storage.getItem('token') !== null) {
      AppData.token.next(this.storage.getItem('token'));
      AppData.isAuthenticated = true;
    }

    if (this.storage.getItem('userData') !== null) {
      AppData.userDataSubject.next(this.storage.getItem('userData'));
    }

    AppData.token.subscribe((data: string) => {
      this.setToken(data);
    });

    AppData.userDataSubject.subscribe((userData) => {
      this.storage.setItem('userData', userData);
      AppData.userData = Object.assign(new UserModel, userData);
    });
  }

  setToken(token: string) {
    this.storage.setItem('token', token);
  }

  isAuthenticatedFunction() {
    return !(this.storage.getItem('token') === null);
  }

}
