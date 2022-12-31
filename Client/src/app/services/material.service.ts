import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllMaterial():Observable<Material[]>{
    return this.http.get<Material[]>(this.baseApiUrl +'api/material');
}
addMaterial(addMaterialRequest:Material):Observable<Material>{
  return this.http.post<Material>(this.baseApiUrl +'api/material', addMaterialRequest);
}
getMaterial(id:string):Observable<Material>{
  return this.http.get<Material>(this.baseApiUrl+'api/material/'+id);
}
updateMaterial(id:string, updateMaterialRequest:Material):Observable<Material>{
  return this.http.put<Material>(this.baseApiUrl +'api/material/'+id, updateMaterialRequest);
}
deleteMaterial(id:string):Observable<Material>{
  return this.http.delete<Material>(this.baseApiUrl +'api/material/'+id);
}
}
