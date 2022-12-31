import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  addClientRequest: Client={
    id:'',
    firstlastname:'',
    email:'',
    adress:'',
    phonenumber:0
  }
 
  constructor(private clientType:ClientsService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.clientType.getClient(id).subscribe({
        next:(response)=>{
this.addClientRequest=response;
        }
      });
    }
      }
    })
  }
    updateVehicle_Type(id:string){
      this.clientType.updateClient(this.addClientRequest.id,this.addClientRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['clientlist']);
        }
      });
    }
  
  }



