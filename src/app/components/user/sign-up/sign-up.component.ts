import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/shared/services/user.service';
import Utils from '@app/shared/utils/utils'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isError: boolean = false;
  errorMessage:any;
  registerForm: FormGroup;
  
  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.registerForm = fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'username': [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose([Validators.required])]
    });

    this.userService.fetchWorkflow().subscribe((data: any) => {
      localStorage.setItem("customer_journey", JSON.stringify(data.data));
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });

  }

 // workflow = '{ "register": [    {      "id": "signup",      "action": "/v1/otp",      "page": "/signup",      "nextTaskId": "otp"    },    {      "id": "otp",      "action": "/v1/register",      "page": "/otp",      "nextTaskId": null    }  ],  "application": [    {      "id": "basic_info",      "action": "/v1/application/basic-info",      "page": "application/basic-info",      "nextTaskId": "owner_info"    },    {      "id": "owner_info",      "action": "/v1/application/owner-info",      "page": "application/owner-info",      "nextTaskId": "loan_detail"    },    {      "id": "loan_detail",      "action": "/v1/application/loan-info",      "page": "application/loan-info",      "nextTaskId": null    }  ]  }';

  ngOnInit() {
    //localStorage.setItem("customer_journey", this.workflow);
    let nextAction = Utils.getNextAction('customer_journey', 'Register', 'signup');
    console.log(nextAction);
  }

  sendOTP(){
    let nextAction = Utils.getNextAction('customer_journey', 'register', 'signup');
    
    this.userService.sendOTP(this.registerForm.value, nextAction).subscribe((data: any) => {
      sessionStorage.setItem('userdata', JSON.stringify(data.data));
      this.router.navigate(['/' + nextAction.nextTaskUrl]);
    },
      (err: HttpErrorResponse) => {
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      }); 
  }
}
