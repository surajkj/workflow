import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectflowService } from '@app/shared/services/projectflow.service';

@Component({
  selector: 'app-subprocess',
  templateUrl: './subprocess.component.html',
  styleUrls: ['./subprocess.component.css']
})
export class SubprocessComponent implements OnInit {
  isError: boolean = false;
  errorMessage: any;
  subprocessForm: FormGroup;
  subprocesses: any;

  constructor(private router: Router, private fb: FormBuilder, private projectFlowService: ProjectflowService) {
    this.projectFlowService.getAllSubprocess().subscribe((data: any) => {
      console.log(data);
      this.subprocesses = data.data;
     // console.log(data.data);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });

    this.subprocessForm = fb.group({
      'process': [null, Validators.compose([Validators.required])],
      'subprocess_title': [null, Validators.compose([Validators.required])]
    });

   }

  ngOnInit() {
  }

  submitSubProcess() {
    //let formData = this.subprocessForm.value;
    let serializedForm = JSON.stringify(this.subprocessForm.value);
    console.log(this.subprocessForm.value);
    //return false;
    this.projectFlowService.saveSubProcess(this.subprocessForm.value).subscribe((data: any) => {
      this.subprocessForm.reset();
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

}
