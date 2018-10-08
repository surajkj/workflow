import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/shared/services/user.service';
import Utils from '@app/shared/utils/utils'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  isError: boolean = false;
  errorMessage: any;
  otpForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.otpForm = fb.group({
      'otp': [null, Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
    let nextAction = Utils.getNextAction('customer_journey', 'register', 'otp');
    console.log(nextAction);
  }

  register() {
    let nextAction = Utils.getNextAction('customer_journey', 'register', 'otp');
    this.userService.register(this.otpForm.value, nextAction).subscribe((data: any) => {
      sessionStorage.removeItem('userdata');
      this.router.navigate(['/' + nextAction.nextTaskUrl]);
    },
      (err: HttpErrorResponse) => {
        this.errorMessage = Object.values(err.error.errors);
        console.log(this.errorMessage);
        this.isError = true;
      });
  }

}
