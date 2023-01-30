import {RegisterPageComponent} from './register-page/register-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthGuard} from './helpers/auth.guard';
import {SecretComponent} from './secret/secret.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminSecretPageComponent} from "./admin-secret-page/admin-secret-page.component";
import {Role} from "./models/role.enum";
import { OffersAddComponent } from './offers/offers-add/offers-add/offers-add.component';
import { OffersListsComponent } from './offers/offers-lists/offers-lists.component';
import { EditOffersComponent } from './offers/offers-edit/edit-offers/edit-offers.component';
import { VehicleTypeAddComponent } from './vehicle_type/vehicle-type-add/vehicle-type-add.component';
import { VehicleTypeEditComponent } from './vehicle_type/vehicle-type-edit/vehicle-type-edit.component';
import { VehicleTypeListsComponent } from './vehicle_type/vehicle-type-lists/vehicle-type-lists.component';
import { VehicleAddComponent } from './vehicle/vehicle-add/vehicle-add.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { ClientListComponent } from './clients_model/client-list/client-list.component';
import { ClientsAddComponent } from './clients_model/clients-add/clients-add.component';
import { ClientEditComponent } from './clients_model/client-edit/client-edit.component';
import { ServiceListComponent } from './service_model/service-list/service-list.component';
import { ServiceOfferListComponent } from './service_offer/service-offer-list/service-offer-list.component';
import { ServiceOfferAddComponent } from './service_offer/service-offer-add/service-offer-add.component';
import { ServiceAddComponent } from './service_model/service-add/service-add.component';
import { ServiceEditComponent } from './service_model/service-edit/service-edit.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { MaterialAddComponent } from './material/material-add/material-add.component';
import { MaterialEditComponent } from './material/material-edit/material-edit.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderMaterialListComponent } from './order_material/order-material-list/order-material-list.component';
import { OrderMaterialAddComponent } from './order_material/order-material-add/order-material-add.component';
import { OrderMaterialEditComponent } from './order_material/order-material-edit/order-material-edit.component';
import { MaterialOfferEditComponent } from './material_offer/material-offer-edit/material-offer-edit.component';
import { MaterialOfferAddComponent } from './material_offer/material-offer-add/material-offer-add.component';
import { MaterialOfferListComponent } from './material_offer/material-offer-list/material-offer-list.component';
import { ServiceOfferEditComponent } from './service_offer/service-offer-edit/service-offer-edit.component';
import { OrderAddComponent } from './order/order-add/order-add.component';
import { UserVehicleAddComponent } from './user-vehicle/user-vehicle-add/user-vehicle-add.component';
import { UserVehicleListComponent } from './user-vehicle/user-vehicle-list/user-vehicle-list.component';
import { UserVehicleEditComponent } from './user-vehicle/user-vehicle-edit/user-vehicle-edit.component';

const routes: Routes = [
  {
    path: 's',
    component: SecretComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'admin',
    component: AdminSecretPageComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin]
    }
  },
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'clientlist',
    component: ClientListComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'material',
    component: MaterialAddComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'materiallist',
    component: MaterialListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'uservehicle',
    component: UserVehicleAddComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'uservehiclelist',
    component: UserVehicleListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'servicelist',
    component: ServiceListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin, Role.User]
    }
  },
  {
    path: 'service_offerlist',
    component: ServiceOfferListComponent,
  },
  {
    path: 'orderlist',
    component: OrderListComponent,
    canActivate: [AuthGuard],

    
  },
  {
    path:'order',
    component:OrderAddComponent,
    canActivate: [AuthGuard],
   
  },
  {
    path: 'service_offer',
    component: ServiceOfferAddComponent,
  },
  {
    path: 'vehicle',
    component: VehicleAddComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'service',
    component: ServiceAddComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin,Role.User]
    }
  },
  {
    path: 'client',
    component: ClientsAddComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  
  {
    path: 'order_materiallist',
    component: OrderMaterialListComponent,
  },
  {
    path: 'order_material',
    component: OrderMaterialAddComponent,
  },
  {
    path: 'material_offer',
    component: MaterialOfferAddComponent,
  },
  {
    path: 'material_offerlist',
    component: MaterialOfferListComponent,
  },
  {
    path: 'vehicle/edit/:id',
    component: VehicleEditComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'uservehicle/edit/:id',
    component: UserVehicleEditComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'service/edit/:id',
    component: ServiceEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'order_material/edit/:id',
    component: OrderMaterialEditComponent,
  },
  {
    path: 'material_offer/edit/:id',
    component: MaterialOfferEditComponent,
  },
  {
    path: 'service_offer/edit/:id',
    component: ServiceOfferEditComponent,
  },
  {
    path: 'order/edit/:id',
    component: OrderEditComponent,
    canActivate: [AuthGuard],

   
  },
  {
    path: 'vehiclelist',
    component: VehicleListComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'vehicle_type',
    component: VehicleTypeAddComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'vehicle_type/edit/:id',
    component: VehicleTypeEditComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'material/edit/:id',
    component: MaterialEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'client/edit/:id',
    component: ClientEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'vehicle_typelist',
    component: VehicleTypeListsComponent,
    data: {
      roles: [Role.User, Role.Admin]
    }
  },
  {
    path: 'offers',
    component: OffersAddComponent,
   

  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  
  {
    path: 'offerslist',
    component: OffersListsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User, Role.Admin]
    }
    
  },
   {
    path: 'offers/edit/:id',
    component: EditOffersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
