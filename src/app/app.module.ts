import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiRequestService } from './shared/services/api-request.service';
import { CommonService } from './shared/services/common.service';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';
import { StorageService } from './core/services/storage/storage.service';
import { AuthService } from './core/services/authguard/auth.service';
import { ToastrModule } from 'ngx-toastr';
// import { AccountModule } from './modules/account/account.module';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    HttpClientModule
  ],
  providers: [
    ApiRequestService,
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    StorageService,
    AuthService,
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
