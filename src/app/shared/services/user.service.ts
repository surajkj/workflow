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

  sendOTP(requestData, nextAction){
    var data = "name=" + requestData.username + "&email=" + requestData.email + "&phone=" + requestData.phone;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '' + nextAction.action, data, { headers: reqHeader });
  }

  register(requestData, nextAction) {
    let userdata = sessionStorage.getItem('userdata');
    let udata = JSON.parse(userdata);
    var data = "name=" + udata.name + "&email=" + udata.email + "&phone=" + udata.phone + "&otp=" + requestData.otp;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '' + nextAction.action, data, { headers: reqHeader });
  }

  fetchWorkflow(){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/process', { headers: reqHeader });
  }
  
}
