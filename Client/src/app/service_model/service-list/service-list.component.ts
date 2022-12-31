import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  userList:any=[];
  Service$!:Observable<any[]>;

    services:any;
    constructor(private serviceList:ServiceService, private router:Router) { }
  
    ngOnInit(): void {
      this.Service$=this.serviceList.getAllServices();

  this.serviceList.getAllServices().subscribe({
    next:(services)=>{
      this.services=services;
    },
    error:(response)=>{
      console.log(response);
    }
  });
    }
    delete(item:any) {
      if(confirm(`Želite li izbirsati uslugu pod rednim brojem ${item.id} ?`)) {
        this.serviceList.deleteServices(item.id).subscribe(res => {
          
        this.Service$ = this.serviceList.getAllServices();
        })
      }
    }
  
  }
  
  