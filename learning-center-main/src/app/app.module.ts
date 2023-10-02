import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {StudentsComponent} from './learning/pages/students/students.component';
import {StudentsService} from "./learning/services/students.service";
import { StudentFormComponent } from './learning/components/student-form/student-form.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AboutComponent } from './public/pages/about/about.component';
import { HomeComponent } from './public/pages/home/home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [AppComponent, StudentsComponent, StudentFormComponent, AboutComponent, HomeComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatTableModule, MatSortModule, MatIconModule, MatPaginatorModule, MatToolbarModule, MatCardModule, MatGridListModule],
  providers: [StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
