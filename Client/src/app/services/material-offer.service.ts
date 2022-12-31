import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material_Offer } from '../models/material_offer';

@Injectable({
  providedIn: 'root'
})
export class MaterialOfferService {

  baseApiUrl:string=environment.apiUrl;


  constructor(private http:HttpClient) {}
  
  getAllMaterial_Offer():Observable<Material_Offer[]>{
    return this.http.get<Material_Offer[]>(this.baseApiUrl +'api/material_offer');
}
addMaterial_Offer(addMaterial_OfferRequest:Material_Offer):Observable<Material_Offer>{
  return this.http.post<Material_Offer>(this.baseApiUrl +'api/material_offer', addMaterial_OfferRequest);
}
getMaterial_Offer(id:string):Observable<Material_Offer>{
  return this.http.get<Material_Offer>(this.baseApiUrl+'api/material_offer/'+id);
}
updateMaterial_Offer(id:string, updateServiceRequest:Material_Offer):Observable<Material_Offer>{
  return this.http.put<Material_Offer>(this.baseApiUrl +'api/material_offer/'+id, updateServiceRequest);
}
deleteMaterial_Offer(id:string):Observable<Material_Offer>{
  return this.http.delete<Material_Offer>(this.baseApiUrl +'api/material_offer/'+id);
}
}