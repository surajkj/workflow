import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '@app/shared/services/application.service';
import Utils from '@app/shared/utils/utils';

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.css']
})
export class LoanInfoComponent implements OnInit {

  isError: boolean = false;
  errorMessage: any;
  loanForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private applicationService: ApplicationService) {
    this.loanForm = fb.group({
      'min_loan_amount': [null, Validators.compose([Validators.required])],
      'max_loan_amount': [null, Validators.compose([Validators.required])],
      'loan_tenor': [null, Validators.compose([Validators.required])],
      'loan_purpose': [null, Validators.compose([Validators.required])]
    });

    let appId = sessionStorage.getItem('appId');
    if (!appId) {
      this.router.navigate(['/application/basic-info']);
    }
  }

  ngOnInit() {
    let nextAction = Utils.getNextAction('customer_journey', 'application', 'loan_detail');
    console.log(nextAction);
  }

  submitLoanInfo() {
    let nextAction = Utils.getNextAction('customer_journey', 'application', 'loan_detail');
    console.log(nextAction);
    this.applicationService.saveApplicationLoanInfo(this.loanForm.value, nextAction).subscribe((data: any) => {
      if (nextAction.nextTaskUrl){
        this.router.navigate(['/' + nextAction.nextTaskUrl]);
      } else{
        this.loanForm.reset();
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

}
