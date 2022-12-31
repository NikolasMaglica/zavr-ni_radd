import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  Clients$!:Observable<any[]>;

  clients:any;
  addVehicle_TypeRequest: Client={
    id:'',
    firstlastname:'',
    email:'',
    adress:'',
    phonenumber:0
  }
 
   
  
  constructor(private clientService:ClientsService, private router:Router) { }

  ngOnInit(): void {
    this.Clients$=this.clientService.getAllClients();
this.clientService.getAllClients().subscribe({
  next:(clients)=>{
    this.clients=clients;
  },
  error:(response)=>{
    console.log(response);
  }
});
  }
  delete(item:any) {
    if(confirm(`Želite li izbirsati klijenta pod rednim brojem ${item.id} ?`)) {
      this.clientService.deleteClient(item.id).subscribe(res => {
        
      this.Clients$ = this.clientService.getAllClients();
      })
    }
  }

}


