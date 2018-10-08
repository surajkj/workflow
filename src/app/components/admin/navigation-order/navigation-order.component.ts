import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { NestableSettings } from '@app/shared/models/nestable.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApplicationService } from '@app/shared/services/application.service';

@Component({
  selector: 'app-navigation-order',
  templateUrl: './navigation-order.component.html',
  styleUrls: ['./navigation-order.component.css']
})
export class NavigationOrderComponent implements OnInit {

  public idCount = 13;
  public options = { fixedDepth: false } as NestableSettings;
/*
  public list = [
    {
      'expanded': true,
      'id': '1', "task_name": "Register", 'children': [
        { 
          "id": "1",
          "task_name": "OTP Request"
        },
        { 
          "id": "1",
          "task_name": "Verify Otp"
        }
      ]
    }
  ];
*/
public updatedNav = [];
public list = [];
  constructor(private el: ElementRef, private renderer: Renderer2, private applicationService: ApplicationService) {
    this.renderer.listen(this.el.nativeElement, 'listUpdated', e => {
      this.list = e.detail.list;
    });

    this.applicationService.getAllNavs().subscribe((data: any) => {
      
      this.list = data.data;
      //console.log(this.list);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        //this.errorMessage = Object.values(err.error.errors);
        //this.isError = true;
      });

  }

  ngOnInit() {
  }

  public toggleFixedDepth() {
    this.options.fixedDepth = !this.options.fixedDepth;
  }

  public drag(e) {
   // console.log(e);
  }

  public drop(e) {    
    let j = 1;   
    this.updatedNav['process_id'] = e.destination.id;
    this.updatedNav['data'] = [];
    for (let i = 0; i < e.destination.children.length; i++) {
      e.destination.children[i]['order'] = j++;
      this.updatedNav['data'].push(e.destination.children[i]);
      
    }
    console.log(this.updatedNav);

    this.applicationService.updateNav(this.updatedNav).subscribe((data: any) => {
     // console.log(data);

    },
      (err: HttpErrorResponse) => {
        console.log(err);
        //this.errorMessage = Object.values(err.error.errors);
        //this.isError = true;
      });

  }

  public onDisclosure(e) {
    console.log(e);
  }

  /*
  list = [{
    name: "Register",
    children: [
      {
        id: "1",
        name: "OTP Request"
      },
      {
        id: "1",
        name: "OTP Verify"
      }
    ]
  },
  {
    name: "Application",
    children: [
      {
        id: "1",
        name: "Basic Info"
      },
      {
        id: "1",
        name: "Loan Info"
      }
    ]
  }
  ];*/

}
