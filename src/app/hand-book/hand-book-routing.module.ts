import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedComponent } from './components/approved/approved.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { HandbookFormComponent } from './components/handbook-form/handbook-form.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"create", component:HandbookFormComponent
  },
 
  {
    path:"list/:status", component:ListComponent
  },
  {
    path:"approved", component:ApprovedComponent
  },
  {
    path:"details/:id", component:DetailsComponent
  },
  {
    path:"edit/:id", component:EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandBookRoutingModule { }
