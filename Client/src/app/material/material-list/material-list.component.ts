import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Material } from 'src/app/models/material.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
  material$!:Observable<any[]>;
  
  
    materials:any;
    addMaterialRequest: Material={
      id:'',
      name:'',
      instockquantity:0,
      price:0,
    description:''
    }
   
     
    
    constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private materialType:MaterialService, private router:Router) { }
  
    ngOnInit(): void {
      this.material$=this.materialType.getAllMaterial();
  this.materialType.getAllMaterial().subscribe({
    next:(materials)=>{
      this.materials=materials;
    },
    error:(response)=>{
      console.log(response);
    }
  });
    }
    delete(item:any) {
      if(confirm(`Želite li izbirsati material pod rednim brojem ${item.id} ?`)) {
        this.materialType.deleteMaterial(item.id).subscribe(
          (result) => {     
            this.material$=this.materialType.getAllMaterial();
              this.snackBar.open('Uspješno ste izbrisali material', 'Zatvori');
              this.router.navigate(['materiallist']);
          },
          (error: HttpErrorResponse) => {
                   this.handleFailedAuthentication(error);
  
          }
      );
      }   
  }
  private handleFailedAuthentication(error: HttpErrorResponse): void {
    let errorsMessage = [];

    let validationErrorDictionary = JSON.parse(JSON.stringify(error.error.errors));
    for (let fieldName in validationErrorDictionary) {
      if (validationErrorDictionary.hasOwnProperty(fieldName)) {
        errorsMessage.push(validationErrorDictionary[fieldName]);
      }
    }
    this.snackBar.open(errorsMessage.join(' '), 'Zatvori');
  }
    logout(): void {
      this.authenticationService.logout();
    }
  
  }
  
  