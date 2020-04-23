import { Component } from '@angular/core';
import { AppData } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';

  constructor(private appData: AppData) {

  }
}
