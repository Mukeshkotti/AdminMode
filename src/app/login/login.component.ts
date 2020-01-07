import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = true;
  userDetails: User;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private AuthService: AuthenticationService, private router: Router,
    private toastr: ToastrService, private SpinnerService: NgxSpinnerService, private route: ActivatedRoute) {
    if (this.AuthService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.SpinnerService.show();
      this.AuthService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        this.AuthService.userProfile().subscribe(response => {
          this.SpinnerService.hide();
          this.toastr.success('Login Successfully', 'Success');
          this.router.navigate([this.returnUrl]);
        });
      }, err => {
        this.SpinnerService.hide();
        this.toastr.info(err, 'Error');
      });
    } else {
      this.submitted = false;
    }
  }

}
