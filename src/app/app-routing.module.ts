import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HandBookModule } from './hand-book/hand-book.module';

const routes: Routes = [
  {
path:"", component:LoginComponent
  },
  {
    path:"handbook", loadChildren:()=>HandBookModule
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
