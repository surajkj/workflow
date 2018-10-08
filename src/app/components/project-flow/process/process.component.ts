import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectflowService } from '@app/shared/services/projectflow.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  isError: boolean = false;
  errorMessage: any;
  processForm: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private projectFlowService: ProjectflowService) {
    this.processForm = fb.group({
      'process_title': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  submitProcess(){
    this.projectFlowService.saveProcess(this.processForm.value).subscribe((data: any) => {
      this.processForm.reset();
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

}
