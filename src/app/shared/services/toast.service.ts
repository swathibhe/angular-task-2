import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export type ToasterType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})


export class ToastService {

  private duration = 3000;
  private toasterConfig = {
    closeButton: true,
    timeOut: this.duration,
    // disableTimeOut: true
  };

  constructor(public toasterService: ToastrService) { }

  async presentToast(message, title, type: ToasterType) {
    this.toasterService[type](message, title, this.toasterConfig);
  }

}
