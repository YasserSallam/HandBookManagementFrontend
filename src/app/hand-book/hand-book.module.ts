import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandBookRoutingModule } from './hand-book-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HandbookFormComponent } from './components/handbook-form/handbook-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, HandbookFormComponent],
  imports: [
    CommonModule,
    HandBookRoutingModule,
    ReactiveFormsModule
  ]
})
export class HandBookModule { }
