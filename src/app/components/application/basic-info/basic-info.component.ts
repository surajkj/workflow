import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '@app/shared/services/application.service';
import Utils from '@app/shared/utils/utils';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  isError: boolean = false;
  errorMessage: any;
  applicationForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private applicationService: ApplicationService) {
    this.applicationForm = fb.group({
      'company_name': [null, Validators.compose([Validators.required])],
      'pan_number': [null, Validators.compose([Validators.required])],
      'itr_income': [null, Validators.compose([Validators.required])],
      'business_year': [null, Validators.compose([Validators.required])],
      'company_address': [null, Validators.compose([Validators.required])],
      'state': [null, Validators.compose([Validators.required])],
      'city': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    let nextAction = Utils.getNextAction('customer_journey', 'application', 'basic_info');
    //console.log(nextAction);
  }

  submitBasicInfo(){
    let nextAction = Utils.getNextAction('customer_journey', 'application', 'basic_info');
    console.log(nextAction);
    this.applicationService.saveApplicationBasicInfo(this.applicationForm.value, nextAction).subscribe((data: any) => {
      sessionStorage.setItem('appId', data.data.id);
      this.router.navigate(['/' + nextAction.nextTaskUrl]);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

}
