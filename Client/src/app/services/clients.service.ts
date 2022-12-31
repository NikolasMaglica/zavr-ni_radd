import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllClients():Observable<Client[]>{
    return this.http.get<Client[]>(this.baseApiUrl +'api/client');
}
addClient(addVehicle_TypeRequest:Client):Observable<Client>{
  return this.http.post<Client>(this.baseApiUrl +'api/client', addVehicle_TypeRequest);
}
getClient(id:string):Observable<Client>{
  return this.http.get<Client>(this.baseApiUrl+'api/client/'+id);
}
updateClient(id:string, updateVehicle_TypeRequest:Client):Observable<Client>{
  return this.http.put<Client>(this.baseApiUrl +'api/client/'+id, updateVehicle_TypeRequest);
}
deleteClient(id:string):Observable<Client>{
  return this.http.delete<Client>(this.baseApiUrl +'api/client/'+id);
}
}