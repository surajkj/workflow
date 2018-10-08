import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  readonly rootUrl = environment.customereUrl;

  constructor(private http: HttpClient) { }

  saveApplicationBasicInfo(requestData, nextAction){
    var data = "company_name=" + requestData.company_name + "&pan_number=" + requestData.pan_number + "&itr_income=" + requestData.itr_income + "&business_year=" + requestData.business_year + "&company_address=" + requestData.company_address + "&state=" + requestData.state + "&city=" + requestData.city;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '' + nextAction.action, data, { headers: reqHeader });
  }

  saveApplicationOwnerInfo(requestData, nextAction) {
    var data = "name=" + requestData.name + "&gender=" + requestData.gender + "&designation=" + requestData.designation + "&marital_status=" + requestData.marital_status + "&dob=" + requestData.dob + "&category=" + requestData.category + "&app_id=" + sessionStorage.getItem('appId');
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '' + nextAction.action, data, { headers: reqHeader });
  }

  saveApplicationLoanInfo(requestData, nextAction) {
    var data = "min_loan_amount=" + requestData.min_loan_amount + "&max_loan_amount=" + requestData.max_loan_amount + "&loan_tenor=" + requestData.loan_tenor + "&loan_purpose=" + requestData.loan_purpose + "&app_id=" + sessionStorage.getItem('appId');
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl+ '' +nextAction.action, data, { headers: reqHeader });
  }

  saveNav(requestData){
    var data = "title=" + requestData.title + "&action=" + requestData.action + "&slug=" + requestData.slug + "&sub_process_id=" + requestData.sub_process_id + "&process_id=" + requestData.process_id + "&form_fields=" + JSON.stringify(requestData.form_fields);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '/v1/tasks/create', data, { headers: reqHeader });
  }

  getAllProcess(){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/process/list', { headers: reqHeader });
  }

  

  fetchSubProcess(process_id){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/sub-process/' + process_id, { headers: reqHeader });
  }

  fetchFormFields(subprocess_id) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/sub-process/fields/' + subprocess_id, { headers: reqHeader });
  }

  getAllRoutes(){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/process/routes', { headers: reqHeader });
  }

  getAllNavs(){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/process/all', { headers: reqHeader });
  }

  updateNav(updatedNav){
    var data = "process_id=" + updatedNav.process_id + "&data=" + JSON.stringify(updatedNav.data);
     
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '/v1/process/update', data, { headers: reqHeader });
  }

  getAllTask(){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/tasks', { headers: reqHeader });
  }

  getFields(taskId){
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.get(this.rootUrl + '/v1/tasks/task-fields/' + taskId, { headers: reqHeader });
  }

  saveWorkflow(workflow) {
    var data = "process_id=" + workflow.process_id + "&sub_process_id=" + workflow.sub_process_id + "&task=" + workflow.task + "&parent_task=" + workflow.parent_task + "&config_array=" + JSON.stringify(workflow.config_array);
    
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(this.rootUrl + '/v1/workflow/create', data, { headers: reqHeader });
  }
}
