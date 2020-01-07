import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails:any;
  currentState: any;

  constructor(private authenticationService: AuthenticationService, private toastr: ToastrService, private router: Router) {
    this.userDetails = this.authenticationService.userDetailValue;
    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart ){
        this.currentState = event.snapshot.routeConfig.path;
      }
    });
  }

  ngOnInit() {
  }

  logout(){
    this.authenticationService.logout().subscribe(res => {
      this.toastr.success('Logout Successfully', 'Success');
    }, err =>{
      this.toastr.error(err, 'Error');
    });
  }

}
