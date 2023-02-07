import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from 'src/app/models/material.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent implements OnInit {

  addMaterialRequest: Material={
    id:'',
    name:'',
    instockquantity:0,
    price:0,
  description:''
  }
  constructor(private snackBar: MatSnackBar, private authenticationService:AuthenticationService, private materialType:MaterialService,private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params)=>{
    const id=params.get('id');

    if(id){
      this.materialType.getMaterial(id).subscribe({
        next:(response)=>{
this.addMaterialRequest=response;
        }
      });
    }
      }
    })
  }
  logout(): void {
    this.authenticationService.logout();
  }
    updateVehicle_Type(id:string){
      this.materialType.updateMaterial(this.addMaterialRequest.id,this.addMaterialRequest).subscribe(
        (result) => {     
            this.snackBar.open('Uspješno ste izmijenili podatke', 'Zatvori');
            this.router.navigate(['materiallist']);
        },
        (error: HttpErrorResponse) => {
                 this.handleFailedAuthentication(error);

        }

      );
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

  
  }


