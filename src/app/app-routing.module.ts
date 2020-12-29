import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ManifestCreateComponent } from './components/manifest/create/create.component';
import { ManifestHomeComponent } from './components/manifest/home/home.component';
import { ManifestViewComponent } from './components/manifest/view/view.component';

import { ShipmentCreateComponent } from './components/shipment/create/create.component';
import { ShipmentHomeComponent } from './components/shipment/home/home.component';
import { ShipmentViewComponent } from './components/shipment/view/view.component';

import { UserCreateComponent } from './components/user/create/create.component';
import { UserHomeComponent } from './components/user/home/home.component';
import { UserViewComponent } from './components/user/view/view.component';

import { GroupCreateComponent } from './components/group/create/create.component';
import { GroupHomeComponent } from './components/group/home/home.component';
import { GroupViewComponent } from './components/group/view/view.component';

import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'manifests',
    component:ManifestHomeComponent
  },
  {
    path:'manifests/new',
    component:ManifestCreateComponent
  },
  {
    path:'manifests/edit',
    component:ManifestViewComponent,
    data:{action:'edit'}
  },
  {
    path:'manifests/view',
    component:ManifestViewComponent,
    data:{action:'view'}
  },
  {
    path:'manifests/shipping',
    component:ManifestHomeComponent,
    data:{category:'shipping'}
  },
  {
    path:'manifests/arrived',
    component:ManifestHomeComponent,
    data:{category:'arrived'}
  },
  {
    path:'manifests/archived',
    component:ManifestHomeComponent,
    data:{category:'archived'}
  },
  {
    path:'manifests/incomplete',
    component:ManifestHomeComponent,
    data:{category:'incomplete'}
  },



  {
    path:'shipments',
    component:ShipmentHomeComponent
  },
  {
    path:'shipments/new',
    component:ShipmentCreateComponent
  },
  {
    path:'shipments/edit',
    component:ShipmentViewComponent,
    data:{action:'edit'}
  },
  {
    path:'shipments/view',
    component:ShipmentViewComponent,
    data:{action:'view'}
  },
  {
    path:'shipments/shipping',
    component:ShipmentHomeComponent,
    data:{category:'shipping'}
  },
  {
    path:'shipments/arrived',
    component:ShipmentHomeComponent,
    data:{category:'arrived'}
  },
  {
    path:'shipments/archived',
    component:ShipmentHomeComponent,
    data:{category:'archived'}
  },
  {
    path:'shipments/incomplete',
    component:ShipmentHomeComponent,
    data:{category:'incomplete'}
  },


  {
    path:'users',
    component:UserHomeComponent
  },
  {
    path:'users/new',
    component:UserCreateComponent
  },
  {
    path:'users/edit',
    component:UserViewComponent,
    data:{action:'edit'}
  },
  {
    path:'users/view',
    component:UserViewComponent,
    data:{action:'view'}
  },
  {
    path:'users/active',
    component:UserHomeComponent,
    data:{category:'active'}
  },
  {
    path:'users/locked',
    component:UserHomeComponent,
    data:{category:'locked'}
  },
  

  {
    path:'groups',
    component:GroupHomeComponent
  },
  {
    path:'groups/new',
    component:GroupCreateComponent
  },
  {
    path:'groups/edit',
    component:GroupViewComponent,
    data:{action:'edit'}
  },
  {
    path:'groups/view',
    component:GroupViewComponent,
    data:{action:'view'}
  },
  
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
