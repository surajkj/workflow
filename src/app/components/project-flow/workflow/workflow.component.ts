import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProjectflowService } from '@app/shared/services/projectflow.service';
import { ApplicationService } from '@app/shared/services/application.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {
  isError: boolean = false;
  errorMessage: any;
  workFlowForm: FormGroup;
  subprocesses: any;
  api_routes: any;
  task_list: any;
  config_fields:any;
  config_array: FormArray;

  constructor(private router: Router, private fb: FormBuilder, private projectFlowService: ProjectflowService, private applicationService: ApplicationService) {
    // this.applicationService.getAllSubprocess().subscribe((data: any) => {
    //   this.subprocesses = data.data;
    // },
    //   (err: HttpErrorResponse) => {
    //     console.log(err);
    //   });

    this.applicationService.getAllRoutes().subscribe((data: any) => {
      this.api_routes = data.data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });

    this.applicationService.getAllTask().subscribe((data: any) => {
      this.task_list = data.data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });

    this.workFlowForm = fb.group({
      'process_id': [null, Validators.compose([Validators.required])],
      'sub_process_id': [null, Validators.compose([Validators.required])],
      'task': [null, Validators.compose([Validators.required])],
      'parent_task': [null, Validators.compose([Validators.required])],
      'form_field': [null],
      'expression': [null],
      'expression_value': [null],
      config_array: this.fb.array([this.createConfig()])
    });
   }

  createConfig(): FormGroup {
    return this.fb.group({
      form_field: '',
      expression: '',
      expression_value: ''
    });
  }

  // addItem(): void {
  //   this.items = this.orderForm.get('items') as FormArray;
  //   this.items.push(this.createItem());
  // }

  ngOnInit() {
  }

  public getSubProcess(event): void {  // event will give you full breif of action
    const process_id = event.target.value;
    this.applicationService.fetchSubProcess(process_id).subscribe((data: any) => {
      this.subprocesses = data.data
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

  getFieldsByTaskId(event): void{
    const taskId = event.target.value;
    this.applicationService.getFields(taskId).subscribe((data: any) => {
      this.config_fields = data.data
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

  submitWorkflow() {
    console.log(this.workFlowForm.value);
    this.applicationService.saveWorkflow(this.workFlowForm.value).subscribe((data: any) => {
      this.workFlowForm.reset();
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

}
