import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HandbookFormComponent } from './components/handbook-form/handbook-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"create", component:HandbookFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandBookRoutingModule { }
