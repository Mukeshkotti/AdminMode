import { Component } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentState: any;
  currentUser: User;
  
  constructor(private router: Router, private authService: AuthenticationService) {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart ){
        this.currentState = event.snapshot.routeConfig.path;
      }
    });
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
}
