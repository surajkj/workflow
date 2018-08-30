import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/shared/models/user.model';
import { environment } from '@env/environment';

@Injectable()
export class UserService {	
  readonly rootUrl = environment.customereUrl;

  constructor(private http: HttpClient) { 
  }

  emailVerify(userName) {
    var data = "email=" + userName;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '/v1/isEmailVerified', data, { headers: reqHeader });
  }

  passwordVerify(pswd) {
    var data = "password=" + pswd + "&email=" + localStorage.getItem('email');
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '/v1/login', data, { headers: reqHeader });
  }
  
}
