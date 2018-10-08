import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '@app/shared/services/application.service';
import Utils from '@app/shared/utils/utils';


@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.css']
})
export class OwnerInfoComponent implements OnInit {

  isError: boolean = false;
  errorMessage: any;
  ownerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private applicationService: ApplicationService) {
    this.ownerForm = fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'gender': [null, Validators.compose([Validators.required])],
      'designation': [null, Validators.compose([Validators.required])],
      'marital_status': [null, Validators.compose([Validators.required])],
      'dob': [null, Validators.compose([Validators.required])],
      'category': [null, Validators.compose([Validators.required])]
    });

    let appId = sessionStorage.getItem('appId');
    if (!appId){
      this.router.navigate(['/application/basic-info']); 
    }
    console.log(appId);
  }

  ngOnInit() {
    let nextAction = Utils.getNextAction('customer_journey', 'application', 'owner_info');
    console.log(nextAction);
  }

  submitOwnerInfo() {
    let nextAction = Utils.getNextAction('customer_journey', 'application', 'owner_info');
    console.log(nextAction);
    this.applicationService.saveApplicationOwnerInfo(this.ownerForm.value, nextAction).subscribe((data: any) => {

      if (nextAction.nextTaskUrl) {
        this.router.navigate(['/' + nextAction.nextTaskUrl]);
      } else {
        this.ownerForm.reset();
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

}
