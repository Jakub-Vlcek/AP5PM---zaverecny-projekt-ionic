import { Component, HostListener } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
  }

  @HostListener('document:readystatechange', ['$event'])
  onReadyStateChanged(event) {
      if (event.target.readyState === 'complete') {
          SplashScreen.hide();
      }
  }


}





