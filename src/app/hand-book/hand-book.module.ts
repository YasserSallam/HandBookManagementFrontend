import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandBookRoutingModule } from './hand-book-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HandbookFormComponent } from './components/handbook-form/handbook-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PendingComponent } from './components/pending/pending.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { RejectedComponent } from './components/rejected/rejected.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';


export  function  HttpLoaderFactory(http:  HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [HomeComponent, HandbookFormComponent, PendingComponent, ApprovedComponent, RejectedComponent, DetailsComponent, EditComponent],
  imports: [
    CommonModule,
    HandBookRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule
  ],
  exports:[],
  providers: [],
})
export class HandBookModule { }
