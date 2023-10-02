import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FoodTruck } from 'src/app/models/food-truck.model';
import { FoodTruckService } from 'src/app/services/food-truck.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<FoodTruck>();
  constructor(private foodTruckService: FoodTruckService) {}
  ngOnInit(): void {
    this.getAllOffer();
  }
  getAllOffer(): void {
    this.foodTruckService.getList().subscribe((res) => {
      this.dataSource.data = res;
    });
  }
}