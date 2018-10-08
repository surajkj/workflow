import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectflowService {
  readonly rootUrl = environment.customereUrl;
  constructor(private http: HttpClient) { }

  getAllSubprocess(){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/process/list', { headers: reqHeader });
  }

  saveSubProcess(requestData) {
   
    var data = "process_id=" + requestData.process + "&name=" + requestData.subprocess_title;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '/v1/process/create-subprocess', data,{ headers: reqHeader });

  }

  saveProcess(requestData){
    var data = "name=" + requestData.process_title + "&process_id=" + requestData.process;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '/v1/process/create', data, { headers: reqHeader });
  }

}
