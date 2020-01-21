import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivationStart } from '@angular/router';
import { Profile } from '../_models/profile';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: Profile = new Profile();
  currentState: any;

  constructor(private authenticationService: AuthenticationService, private toastr: ToastrService, private router: Router, private SpinnerService: NgxSpinnerService) {
    if (this.authenticationService.userDetailValue) {
      this.userDetails = this.authenticationService.userDetailValue[0];
    }
    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        this.currentState = event.snapshot.routeConfig.path;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.SpinnerService.show();
    this.authenticationService.logout().subscribe(res => {
      this.SpinnerService.hide();
      this.toastr.success('Logout Successfully', 'Success');
    }, err => {
      this.toastr.error(err, 'Error');
    });
  }

}
