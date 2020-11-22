import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedComponent } from './components/approved/approved.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { HandbookFormComponent } from './components/handbook-form/handbook-form.component';
import { HomeComponent } from './components/home/home.component';
import { PendingComponent } from './components/pending/pending.component';
import { RejectedComponent } from './components/rejected/rejected.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"create", component:HandbookFormComponent
  },
  {
    path:"pending", component:PendingComponent
  },
  {
    path:"approved", component:ApprovedComponent
  },
  {
    path:"rejected", component:RejectedComponent
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
