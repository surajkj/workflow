//import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { SortablejsOptions } from 'angular-sortablejs/dist';
// import { ListTest } from '@app/shared/models/listtest.model';
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '@app/shared/services/application.service';
import { DndDropEvent } from "ngx-drag-drop";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // @Input() listTest: ListTest;

  // @Input() isRoot: boolean;

  // options: SortablejsOptions = {
  //   group: 'test',
  //   onUpdate: () => {
  //     console.log('updated');
  //   },
  //   onAdd: () => {
  //     console.log('added');
  //   },
  //   onRemove: () => {
  //     console.log('removed');
  //   },
  // };



  draggables = [
    {
      content: "testdata",
      effectAllowed: "copy",
      disable: false,
      handle: false,
    },
    {
      content: "testdata2",
      effectAllowed: "move",
      disable: false,
      handle: false,
    },
    {
      content: "testdata3",
      effectAllowed: "link",
      disable: false,
      handle: false
    },
    {
      content: "testdata4",
      effectAllowed: "copy",
      disable: true,
      handle: false,
    },
    {
      content: "testdata5",
      effectAllowed: "copy",
      disable: false,
      handle: true,
    }
  ];

  draggableWithDragImage = {
    content: "testdata6",
    effectAllowed: "copy",
    disable: false,
    handle: true
  };

  public dropzoneEnabled: boolean = true;
  public lastDropEvent: DndDropEvent | null = null;

  private currentDraggableEvent: DragEvent;
  private currentDragEffectMsg: string;

  onDragStart(event: DragEvent) {

    this.lastDropEvent = null;

    this.currentDragEffectMsg = "";
    this.currentDraggableEvent = event;
   
  }

  onDragged($event: DragEvent, effect: string) {

    this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;
  }

  onDragEnd(event: DragEvent) {

    this.currentDraggableEvent = event;
    
  }

  onDrop(event: DndDropEvent) {

    this.lastDropEvent = event;
  }



  isError: boolean = false;
  errorMessage: any;
  taskForm: FormGroup;
  subprocesses: any;
  formFields: any;
  api_routes: any;

  constructor(private router: Router, private fb: FormBuilder, private applicationService: ApplicationService) {
    this.applicationService.getAllRoutes().subscribe((data: any) => {
      this.api_routes = data.data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });

      this.initForm();

    
  }

  initForm() {
 /* let allCategories: FormArray = new FormArray([]);
  for (let i = 0; i < this.categories.length; i++) {
    allCategories.push(
      new FormGroup({
        'name': new FormControl([this.categories[i].categoryName])
      })
    )
  }*/


  this.taskForm = this.fb.group({
      'title': [null, Validators.compose([Validators.required])],
      'slug': [null, Validators.compose([Validators.required])],
      'action': [null, Validators.compose([Validators.required])],
      'process_id': [null, Validators.compose([Validators.required])],
      'sub_process_id': [null, Validators.compose([Validators.required])],
      'form_fields': []
    });
}

  ngOnInit() {
  }

  submitTask() {
    console.log(this.formFields);
    console.log(this.taskForm.value);
    return false;
   /* this.applicationService.saveNav(this.taskForm.value).subscribe((data: any) => {
      this.taskForm.reset();
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });*/
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

  public getFormFields(event): void{
    const subprocess_id = event.target.value;
    this.applicationService.fetchFormFields(subprocess_id).subscribe((data: any) => {
      this.formFields = data.data;
      console.log(this.formFields);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

  drop(e) {
    e.preventDefault();
    //var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

}
