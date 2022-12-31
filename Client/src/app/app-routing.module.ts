import {RegisterPageComponent} from './register-page/register-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthGuard} from './helpers/auth.guard';
import {SecretComponent} from './secret/secret.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminSecretPageComponent} from "./admin-secret-page/admin-secret-page.component";
import {Role} from "./models/role.enum";
import { OffersAddComponent } from './offers/offers-add/offers-add/offers-add.component';
import { MenuComponent } from './menu/menu.component';
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
  },
  {
    path: 'material',
    component: MaterialAddComponent,
  },
  {
    path: 'materiallist',
    component: MaterialListComponent,
  },
  {
    path: 'servicelist',
    component: ServiceListComponent,
  },
  {
    path: 'service_offerlist',
    component: ServiceOfferListComponent,
  },
  {
    path: 'orderlist',
    component: OrderListComponent,
  },
  {
    path: 'service_offer',
    component: ServiceOfferAddComponent,
  },
  {
    path: 'vehicle',
    component: VehicleAddComponent,
  },
  {
    path: 'service',
    component: ServiceAddComponent,
  },
  {
    path: 'client',
    component: ClientsAddComponent,
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
  },
  {
    path: 'service/edit/:id',
    component: ServiceEditComponent,
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
  },
  {
    path: 'vehiclelist',
    component: VehicleListComponent,
  },
  {
    path: 'vehicle_type',
    component: VehicleTypeAddComponent,
  },
  {
    path: 'vehicle_type/edit/:id',
    component: VehicleTypeEditComponent,
  },
  {
    path: 'material/edit/:id',
    component: MaterialEditComponent,
  },
  {
    path: 'client/edit/:id',
    component: ClientEditComponent,
  },
  {
    path: 'vehicle_typelist',
    component: VehicleTypeListsComponent,
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
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'offerslist',
    component: OffersListsComponent,
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
