import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css']
})
export class ClientsAddComponent implements OnInit {

  addVehicle_TypeRequest: Client={
    id:'',
    firstlastname:'',
    email:'',
    adress:'',
    phonenumber:0
  }
  constructor(private authenticationService:AuthenticationService,private clientService:ClientsService, private router:Router) { }

  ngOnInit(): void {
  
   
  }
  logout(): void {
    this.authenticationService.logout();
  }
  addClientType(){
    this.clientService.addClient(this.addVehicle_TypeRequest).subscribe({
      next:(offers)=>{
        this.router.navigate(['clientlist']);
      }
    })  }
}



