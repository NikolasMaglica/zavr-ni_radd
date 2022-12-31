import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllServices():Observable<Service[]>{
    return this.http.get<Service[]>(this.baseApiUrl +'api/service');
}
addServices(addServiceRequest:Service):Observable<Service>{
  return this.http.post<Service>(this.baseApiUrl +'api/service', addServiceRequest);
}
getServices(id:string):Observable<Service>{
  return this.http.get<Service>(this.baseApiUrl+'api/service/'+id);
}
updateServices(id:string, updateServiceRequest:Service):Observable<Service>{
  return this.http.put<Service>(this.baseApiUrl +'api/service/'+id, updateServiceRequest);
}
deleteServices(id:string):Observable<Service>{
  return this.http.delete<Service>(this.baseApiUrl +'api/service/'+id);
}
}