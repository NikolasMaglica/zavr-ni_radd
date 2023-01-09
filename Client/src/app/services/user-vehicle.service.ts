import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User_Vehicle } from '../models/user_vehicle';

@Injectable({
  providedIn: 'root'
})
export class UserVehicleService {
  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllUser_Vehicle():Observable<User_Vehicle[]>{
    return this.http.get<User_Vehicle[]>(this.baseApiUrl +'api/user_vehicle');
}
addUser_Vehicle(addUser_VehicleRequest:User_Vehicle):Observable<User_Vehicle>{
  return this.http.post<User_Vehicle>(this.baseApiUrl +'api/user_vehicle', addUser_VehicleRequest);
}
getUser_Vehicle(id:string):Observable<User_Vehicle>{
  return this.http.get<User_Vehicle>(this.baseApiUrl+'api/user_vehicle/'+id);
}
updateUser_Vehicle(id:string, addUser_VehicleRequest:User_Vehicle):Observable<User_Vehicle>{
  return this.http.put<User_Vehicle>(this.baseApiUrl +'api/user_vehicle/'+id, addUser_VehicleRequest);
}
deleteUser_Vehicle(id:string):Observable<User_Vehicle>{
  return this.http.delete<User_Vehicle>(this.baseApiUrl +'api/user_vehicle/'+id);
}
}

