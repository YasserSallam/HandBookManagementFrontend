import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandBookRoutingModule } from './hand-book-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HandbookFormComponent } from './components/handbook-form/handbook-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApprovedComponent } from './components/approved/approved.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';


export  function  HttpLoaderFactory(http:  HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [HomeComponent, HandbookFormComponent, ApprovedComponent, DetailsComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    HandBookRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    FormsModule
  ],
  exports:[],
  providers: [],
})
export class HandBookModule { }
