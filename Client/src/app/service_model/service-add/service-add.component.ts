import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {

  addServiceRequest: Service={
    id:'',
    name:'',
    price:0,
    description:''
  }
  constructor(private serviceType:ServiceService, private router:Router) { }

  ngOnInit(): void {
  
   
  }
  addServiceType(){
    this.serviceType.addServices(this.addServiceRequest).subscribe({
      next:(services)=>{
        this.router.navigate(['servicelist']);
      }
    })  }
}
