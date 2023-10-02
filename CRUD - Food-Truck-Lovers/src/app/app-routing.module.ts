import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListFoodTruckComponent } from './components/list-food-truck/list-food-truck.component';
import { FoodTruckFormComponent } from './components/food-truck-form/food-truck-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'food-trucks', component: ListFoodTruckComponent },
  { path: 'food-trucks/new', component: FoodTruckFormComponent },
  { path: 'food-trucks/edit/:id', component: FoodTruckFormComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
