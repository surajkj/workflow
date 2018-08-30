import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;
  isValidRequest: boolean = true;
  emailForm: boolean = false;
  passwordForm: boolean = false;
  errorMessage: string = '';
  emailPattern = "/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/";
  signinForm: FormGroup;
  email: string = '';

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    localStorage.removeItem('email');
    this.emailForm = true;
    this.signinForm = fb.group({
      'email': [null, Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
  }

  emailVerify(requestData){
    this.userService.emailVerify(requestData.email).subscribe((data: any) => {
      localStorage.setItem('email', requestData.email);
      this.signinForm = this.fb.group({
        'email': [{ value: requestData.email, disabled: true }],
        'password': [null, Validators.compose([Validators.required])]
      });
      this.emailForm = false;
      this.passwordForm = true;
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.errorMessage = err.error.errors.email;
      });
  }

  passwordVerify(requestData) {
    this.userService.passwordVerify(requestData.password).subscribe((data: any) => {
      localStorage.setItem('userToken', '123456');
      this.router.navigate(['/home']);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.errorMessage = err.error.errors.password;
      });
  }

}
