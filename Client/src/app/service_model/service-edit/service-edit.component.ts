import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  addServiceRequest: Service={
    id:'',
    name:'',
    price:0,
    description:''
  }
  constructor(private serviceType:ServiceService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.serviceType.getServices(id).subscribe({
        next:(response)=>{
this.addServiceRequest=response;
        }
      });
    }
      }
    })
  }
    updateService(id:string){
      this.serviceType.updateServices(this.addServiceRequest.id,this.addServiceRequest).subscribe({
        next:(response)=>{
          this.router.navigate(['servicelist']);
        }
      });
    }
  
  }


