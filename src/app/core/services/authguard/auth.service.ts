import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AppData } from 'src/app/shared/services/app-data.service';
import { StorageService } from '../storage/storage.service';


@Injectable()
export class AuthService {
  private state: RouterStateSnapshot;
  constructor(private storage: StorageService, private router: Router, ) {
    this.state = router.routerState.snapshot;
    if (this.isAuthenticated()) {
      this.reInitializeAppData();
    } else {
      this.initializeAppData();
    }

  }

  isAuthenticated() {
    return AppData.isAuthenticated;
  }

  initializeAppData() {
    //  AppData.userDataSubject.next(null);
    //    AppData.token.next(null);
    //  AppData.isAuthenticated = false;
  }

  reInitializeAppData() {
    AppData.token.next(this.storage.getItem('token'));
    AppData.userDataSubject.next(this.storage.getItem('userData'));
    const obj = {
      changeIndex: true,
      outletList: this.storage.getItem('outletList') ? this.storage.getItem('outletList') : []
    };

    AppData.isAuthenticated = true;
  }

  logout() {
    this.storage.clearStorage();
    AppData.userDataSubject.next(null);
    AppData.token.next(null);
    AppData.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
