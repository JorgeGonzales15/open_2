import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//Components, Models & Services
import { FoodTruckService } from 'src/app/services/food-truck.service';
import { FoodTruck } from 'src/app/models/food-truck.model';
import { FoodTruckFormComponent } from '../food-truck-form/food-truck-form.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

//Angular Material
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-food-truck',
  templateUrl: './list-food-truck.component.html',
  styleUrls: ['./list-food-truck.component.scss']
})
export class ListFoodTruckComponent implements OnInit{
  dataSource = new MatTableDataSource<FoodTruck>;
  displayedColumns: string[] = [
    'id', 
    'ownerFirstName', 
    'ownerLastName', 
    'brandName', 
    'email', 
    'address', 
    'websiteUrl', 
    'menuUrl', 
    'actions'];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( 
    private foodTruckService: FoodTruckService, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.getAllFoodTruck();
  }

  getAllFoodTruck(){
    this.foodTruckService.getList().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteFoodTruck(id: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.foodTruckService.deleteItem(id).subscribe((response: any)=>{
          this.dataSource.data = this.dataSource.data.filter((o: any)=>{
            return o.id !==id ? o: false;
          });
          this.getAllFoodTruck();
          this.snackBar.open('Offer deleted successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        });
        console.log(this.dataSource.data);
      }
    });
  }
  editFoodTruck(id: number) {
    this.router.navigate(['food-trucks/edit', id])
  }
}