import { Component } from '@angular/core';
import { TranslateService } from  '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Task';
  currentLang='en';
  constructor(private translate:  TranslateService){  
    translate.setDefaultLang('en');

translate.use('en');
  }
  

  changeLang(event){
    event.preventDefault();
    if(this.translate.currentLang == 'en')
    {
        this.translate.use('ar');
        this.currentLang='ar'
    }
        else{
        this.translate.use('en');
        this.currentLang='en'
        }
  }
}
