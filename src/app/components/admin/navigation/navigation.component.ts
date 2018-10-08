import { Component, OnInit, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '@app/shared/services/application.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isError: boolean = false;
  errorMessage: any;
  navForm: FormGroup;
  subprocesses: any;
  api_routes: any;

  constructor(private router: Router, private fb: FormBuilder, private applicationService: ApplicationService) {
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

    this.navForm = fb.group({
      'title': [null, Validators.compose([Validators.required])],
      'slug': [null, Validators.compose([Validators.required])],
      'action': [null, Validators.compose([Validators.required])],
      'process_id': [null],
      'sub_process_id': [null]
    });
  }

  ngOnInit() {
  }

  submitNav(){
    //let formData = this.navForm.value;
    //let serializedForm = JSON.stringify(this.navForm.value);
    console.log(this.navForm.value);
    
    this.applicationService.saveNav(this.navForm.value).subscribe((data: any) => {
      this.navForm.reset();
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMessage = Object.values(err.error.errors);
        this.isError = true;
      });
  }

}
